const graf = d3.select("#graf")
//const tooltip = d3.select("#tooltip")
//const country = d3.select("#country")
//const population = d3.select("#population")
//const btnAnimando = d3.select("#btnAnimando")

const margins = { left: 75, top: 40, right: 10, bottom: 50 }
const anchoTotal = +graf.style("width").slice(0, -2)
const altoTotal = (anchoTotal * 9) / 16
const ancho = anchoTotal - margins.left - margins.right
const alto = altoTotal - margins.top - margins.bottom

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

const x = d3.scaleLinear().range([0, ancho])
const y = d3.scaleLinear().range([alto, 0])
//const A = d3.scaleLinear().range([5, 70600])
//.domain(["Total", "0-5", "6-9", "10-12", "+13"])
const grado = d3.scaleOrdinal().range([0+5, ancho/4, ancho /2, 3*ancho/4 , ancho-5])
const xAxis = d3.axisBottom(grado).tickSize(-alto)
const yAxis = d3.axisLeft(y).tickSize(-ancho)

//let iy, maxy, miny
//let animando = false
//let intervalo
//let showT = undefined

//var x = d3.scale.ordinal()
//    .domain(["apple", "orange", "banana", "grapefruit"])
//    .rangePoints([0, width]);

//var xAxis = d3.svg.axis()
//    .scale(x)
//    .orient("bottom");

const load = async () => {
  data = await d3.csv("data/data_Desemp-Urbano.csv", d3.autoType)
  //data = d3.filter(data, (d) => d.income !== null)

  x.domain(d3.extent(data, (d) => d.PIB))
  y.domain([0, d3.max(data, (d)=> d.value )*1.1])//(d3.extent(data, (d) => d.value))
  //A.domain(d3.extent(data, (d) => d.population))
 grado.domain(Array.from(new Set(data.map((d) => d.Escolaridad))))

  //miny = d3.min(data, (d) => d.year)
  //maxy = d3.max(data, (d) => d.year)
  //iy = miny

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

  render(data)
}

const render = (data) => {
  //let newData = d3.filter(data, (d) => d.year == iy)
  //console.log(newData)

  // Join-Enter-Update-Exit
 
 g.selectAll("circle").data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => grado(d.Escolaridad))//x(d.PIB))
    .attr("cy", (d) => y(d.value))
    .attr("r", 5)
    .attr("fill", "#a0136788")//(d) => grado(d.Escolaridad) + "88")
    .attr("clip-path", "url(#clip)")
    .attr("stroke", "#00000088")

   
    //.on("click", (e, d) => showTooltip(d))
    // .on("mouseout", (e, d) => hideTooltip())
    //.merge(circle)
    //.transition()
    //.duration(200)
    //.attr("cx", (d) => x(d.income))
    //.attr("cy", (d) => y(d.life_exp))
    //.attr("r", 10)//(d) => Math.sqrt(A(d.population) / Math.PI))
    //.attr("fill", (d) => grado(d.Escolaridad) + "88")

//  circle
//    .exit()
//    .transition()
//    .duration(200)
//    .attr("r", 0)
//    .attr("fill", "#ff000088")
// /   .remove()

 }



// let intervalo



load()
