# Use the official ASP.NET runtime as a parent image
FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80

# Use the SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["FitHub.Server/FitHub.Server.csproj", "FitHub.Server/"]
COPY ["FitHub.AccountManagement/FitHub.AccountManagement.csproj", "FitHub.AccountManagement/"]
COPY ["FitHub.ModuleIntegration/FitHub.ModuleIntegration.csproj", "FitHub.ModuleIntegration/"]
RUN dotnet restore "FitHub.Server/FitHub.Server.csproj"
COPY . .
WORKDIR "/src/FitHub.Server"
RUN dotnet build "FitHub.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FitHub.Server.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FitHub.Server.dll"]