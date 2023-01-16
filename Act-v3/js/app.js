const graf = d3.select("#graf")
const graf2 = d3.select("#graf2")

// Estas constantes contienen información sobre las dimensiones de la pantalla
const margins = { left: 75, top: 40, right: 10, bottom: 50 }
const anchoTotal = +graf.style("width").slice(0, -2)
const altoTotal = (anchoTotal * 9) / 16
const ancho = anchoTotal - margins.left - margins.right
const alto = altoTotal - margins.top - margins.bottom
// para primer grafico
const svg = graf
  .append("svg")
  .attr("width", anchoTotal)
  .attr("height", altoTotal)
  .attr("class", "fig")

const g = svg
  .append("g")
  .attr("transform", `translate(${margins.left}, ${margins.top})`)

const clip = g
  .append("clipPath")
  .attr("id", "clip")
  .append("rect")
  .attr("width", ancho)
  .attr("height", alto)



g.append("rect")
  .attr("x", "0")
  .attr("y", "0")
  .attr("width", ancho)
  .attr("height", alto)
  .attr("class", "grupo")


// para el segundo grafico

const svg2 = graf2
  .append("svg")
  .attr("width", anchoTotal)
  .attr("height", altoTotal)
  .attr("class", "fig")

const g2 = svg2
  .append("g")
  .attr("transform", `translate(${margins.left}, ${margins.top})`)

const clip2 = g2
  .append("clipPath")
  .attr("id", "clip")
  .append("rect")
  .attr("width", ancho)
  .attr("height", alto)



g2.append("rect")
  .attr("x", "0")
  .attr("y", "0")
  .attr("width", ancho)
  .attr("height", alto)
  .attr("class", "grupo")




  // Las siguientes constantes tienen que ver con las escalas de las dimensiones de las gráficas
const x = d3.scaleLinear().range([0, ancho])
const y = d3.scaleLinear().range([alto, 0])
const grado = d3.scaleOrdinal().range([0+5, ancho/4, ancho /2, 3*ancho/4 , ancho-5])
const xyear = d3.scaleLinear().range([0, ancho])
const educa = d3.scaleOrdinal().range(d3.schemeDark2)

const xAxis = d3.axisBottom(grado).tickSize(-alto)
const yAxis = d3.axisLeft(y).tickSize(-ancho)
const xAxis2 = d3.axisBottom(xyear).tickSize(-alto)

// En la función load se cargan todos los datos que se mostraran en la gráfica
const load = async () => {
  data = await d3.csv("data/data_Desemp-Urbano.csv", d3.autoType)
  

  x.domain(d3.extent(data, (d) => d.PIB))
  y.domain([0, d3.max(data, (d)=> d.value )*1.1])
  grado.domain(Array.from(new Set(data.map((d) => d.Escolaridad))))
  educa.domain(Array.from(new Set(data.map((d) => d.Escolaridad))))

 xyear.domain(d3.extent(data, (d) => d.Fecha))//domain(Array.from(new Set(data.map((d) => d.Fecha))))//(d3.extent(data, (d) => d.Años__ESTANDAR))

// primera grafica
  g.append("g")
    .attr("transform", `translate(0, ${alto})`)
    .attr("class", "ejes")
    .call(xAxis)
  g.append("g").attr("class", "ejes").call(yAxis)

  g.append("text")
    .attr("x", ancho / 2)
    .attr("y", alto + 40)
    .attr("text-anchor", "middle")
    .attr("class", "labels")
    .text("Años de estudio")

  g.append("g")
    .attr("transform", `translate(0, ${alto / 2})`)
    .append("text")
    .attr("y", -35)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .attr("class", "labels")
    .text("Tasa de desempleo urbano")

    // segunda grafica

  g2.append("g")
    .attr("transform", `translate(0, ${alto})`)
    .attr("class", "ejes")
    .call(xAxis2)
  g2.append("g").attr("class", "ejes").call(yAxis)

  g2.append("text")
    .attr("x", ancho / 2)
    .attr("y", alto + 40)
    .attr("text-anchor", "middle")
    .attr("class", "labels")
    .text("Año")

  g2.append("g")
    .attr("transform", `translate(0, ${alto / 2})`)
    .append("text")
    .attr("y", -35)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .attr("class", "labels")
    .text("Tasa de desempleo urbano")

  render(data)
}

// Esta es la función que dibuja la gráfica
const render = (data) => {
 

  // Join-Enter-Update-Exit
 
 g.selectAll("circle").data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => grado(d.Escolaridad))//x(d.PIB))
    .attr("cy", (d) => y(d.value))
    .attr("r", 5)
    .attr("fill", (d) => educa(d.Escolaridad) + "88")
    .attr("clip-path", "url(#clip)")
    .attr("stroke", "#00000088")


// datos para la segunda gráfica
    g2.selectAll("circle").data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xyear(d.Fecha))//x(d.PIB))
    .attr("cy", (d) => y(d.value))
    .attr("r", 5)
    .attr("fill",  (d) => educa(d.Escolaridad) + "88")
    .attr("clip-path", "url(#clip)")
    .attr("stroke", "#00000088")




   
 }



// let intervalo



load()

