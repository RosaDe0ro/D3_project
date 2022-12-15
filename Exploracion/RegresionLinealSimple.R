library(ggplot2)
library(corrplot)
rm(list=ls())  #permite borrar todos los objetos y/o datos guardados de codigos anteriores
setwd("C:/Users/Home/Documents/Rosaura/HerramientasVisualizacion/Actividad1") #definir el directorio a trabajar
data <- read.csv("datosExploratorios.csv") #cargar el archivo
Explor.cor <- cor(data, method = 'pearson')
round(Explor.cor,digits = 2)
corrplot(Explor.cor)
corrplot(Explor.cor,type='full',addCoef.col = 'black', col = palette("Tableau 10"), tl.col='black')

lineal <- lm(data$Murder ~ data$Assault)
summary(lineal)
anova(lineal)

# 1 - A plot of residuals against fitted values
# 2 -A normal Q-Q plot
# 3 -A Scale-Location plot of sqrt(| residuals |) against fitted values
# 4 -A plot of Cook's distances versus row labels
# 5 -A plot of residuals against leverages
# 6 -A plot of Cook's distances against leverage/(1-leverage)

plot(lineal, which=1)
plot(lineal, which=2)
plot(lineal, which=3)
plot(lineal, which=4)
