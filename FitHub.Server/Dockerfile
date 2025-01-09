FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["FitHub.Server/FitHub.Server.csproj", "FitHub.Server/"]
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