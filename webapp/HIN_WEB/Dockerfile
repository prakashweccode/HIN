#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
RUN curl -sL https://deb.nodesource.com/setup_10.x |  bash -
RUN apt-get install -y nodejs	

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
RUN curl -sL https://deb.nodesource.com/setup_10.x |  bash -
RUN apt-get install -y nodejs
WORKDIR /src
COPY ["HIN_WEB/HIN_WEB.csproj", "HIN_WEB/"]
RUN dotnet restore "HIN_WEB/HIN_WEB.csproj"
COPY . .
WORKDIR "/src/HIN_WEB"
RUN dotnet build "HIN_WEB.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "HIN_WEB.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "HIN_WEB.dll"]