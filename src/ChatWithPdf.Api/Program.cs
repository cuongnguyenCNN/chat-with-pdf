using ChatWithPdf.Api.Data;
using ChatWithPdf.Api.Services;
using Microsoft.EntityFrameworkCore;
using ChatWithPdf.Domain;
using Pgvector.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        o => o.UseVector()));
// builder.Services.AddDbContext<AppDbContext>(
//     options =>
//     {
//         options.UseNpgsql(
//             builder.Configuration.GetConnectionString(
//                 "DefaultConnection"),
//             npgsqlOptions =>
//             {
//                 npgsqlOptions.UseVector();
//             });
//     });

builder.Services.AddScoped<IPdfService, PdfService>();
// Infrastructure
builder.Services.AddScoped<PdfPigTextExtractor>();
builder.Services.AddScoped<PdfPigLayoutExtractor>();
builder.Services.AddScoped<OcrPdfExtractor>();
builder.Services.AddScoped<IPdfExtractorSelector, PdfExtractorSelector>();
builder.Services.AddScoped<
    IEmbeddingService,
    OpenAIEmbeddingService>();

builder.Services.AddScoped<
    IVectorSearchService,
    VectorSearchService>();

builder.Services.AddScoped<
    IChatService,
    OpenAIChatService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "Frontend",
        policy =>
        {
            policy
                .WithOrigins(
                    "http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("Frontend");

app.MapControllers();

app.Run();