"use strict"

// http://www.jqplot.com/docs/files/plugins/jqplot-meterGaugeRenderer-js.html#$.jqplot.MeterGaugeRenderer
	   /*
	$.jqplot.MeterGaugeRenderer	Plugin renderer to draw a meter gauge chart.
	Properties	==
	diameter	Outer diameter of the meterGauge, auto computed by default
	padding	padding between the meterGauge and plot edges, auto calculated by default.
	shadowOffset	offset of the shadow from the gauge ring and offset of each succesive stroke of the shadow from the last.
	shadowAlpha	transparency of the shadow (0 = transparent, 1 = opaque)
	shadowDepth	number of strokes to apply to the shadow, each stroke offset shadowOffset from the last.
	background	background color of the inside of the gauge.
	ringColor	color of the outer ring, hub, and needle of the gauge.
	tickColor	color of the tick marks around the gauge.
	ringWidth	width of the ring around the gauge.
	min	Minimum value on the gauge.
	max	Maximum value on the gauge.
	ticks	Array of tick values.
	showTicks	true to show ticks around gauge.
	showTickLabels	true to show tick labels next to ticks.
	label	A gauge label like ‘kph’ or ‘Volts’
	labelHeightAdjust	Number of Pixels to offset the label up (-) or down (+) from its default position.
	labelPosition	Where to position the label, either ‘inside’ or ‘bottom’.
	intervals	Array of ranges to be drawn around the gauge.
	intervalColors	Array of colors to use for the intervals.
	intervalInnerRadius	Radius of the inner circle of the interval ring.
	intervalOuterRadius	Radius of the outer circle of the interval ring.
	tickSpacing	Degrees between ticks.
	hubRadius	Radius of the hub at the bottom center of gauge which the needle attaches to.
	tickPadding	padding of the tick marks to the outer ring and the tick labels to marks.
	needleThickness	Maximum thickness the needle.
	needlePad	Padding between needle and inner edge of the ring when the needle is at the min or max gauge value.
	pegNeedle	True will stop needle just below/above the min/max values if data is below/above min/max, as if the meter is “pegged”.
	*/   

$(document).ready(function(){

		var data = prepareData(1,[3,6,14])
		plot("chart1",data)
		var data = prepareData(5,[3,6,14])
		plot("chart2",data)
		var data = prepareData(13,[1,6,14])
		plot("chart3",data)

});
function prepareData(selectedValue,range){
		// intervls item [valor,label,color inactivo, color en rango]
		range = range || [3,6,14]

//	   var intervals = [[range[0],"Cota Inf&nbsp;"+range[0],"#FECEB1","#F05C2F"],[range[1],"Cota Sup&nbsp;"+range[1],"#FFFFC6","#FFFF66"],[range[2],"Maximum "+range[2]+"","#C9E0C2","#009933"]];
/*	   var intervals = [
	   [range[0],"Cota Inf&nbsp;"+range[0],"#FECEB1","#F05C2F"],
	   [range[1],"Cota Sup&nbsp;"+range[1],"#FFFFC6","#FFFF66"],
	   [range[2],"Maximum "+range[2]+"","#C9E0C2","#009933"]];
*/
		// TODO corregir lib para agregar labels y desplazarlos relativos a su posicion
	   var intervals = [
	   [range[0],""+range[0],"#FECEB1","#F05C2F"],
	   [range[1],""+range[1],"#FFFFC6","#FFFF66"],
	   [range[2],""+range[2]+"","#C9E0C2","#009933"]];
	   
	   var selected = [selectedValue,selectedValue+""];

	   var ticks = [];
	   // el ticks es lo que se muestra en el gauge
	   // se crea con un array, y cada item de ese array es a su vez un array del
	   // tipo [indice,label], este script crea ese array y pone un label vacio en 
	   // y los deja " " (vacios) si no es interval o selected

		var inte=[] 
		var selectedClass=""
		var sel = selected[0]
		for(ix=0;ix<intervals.length;ix++){
			inte.push(intervals[ix][0])
			var ref=(ix==0)?-1:inte[ix-1];
			if(sel>=ref && sel<inte[ix] ){
				selectedClass = 'jqplot-meterGauge-tick-selected-'+ix				
				intervals[ix][2]=intervals[ix][3] // seleccionado usa color alterno
			} 
		}

	   for(var i=0;i<=inte[inte.length-1];i++){
	   	var res
	   	if(i==0){
	   	 res="0"	
	   	} else{
		   	var ix = $.inArray(i, inte)
		   	if(ix>=0 || i==sel){
		   		if(i==sel) res = selected[1]
		   		else res = intervals[ix][1]
		   	}else{res = ''}
	   }
	   	ticks[i]=[i,res]
	   }

	   return {ticks:ticks,selected:selected,intervals:intervals,selectedClass:selectedClass}

}
function plot(id,data) {

	   //$('#'+id).width(200)
	   $('#'+id).height(170) // para calcular el tamaño toma el minimo entre el w y h del canvas que esta dentro de la zona de ploteo
	   		// no es el tamaño exacto porque por fuera del cavas del ploteo pone grillas y otras cosas

	   $.jqplot(id,[[data.selected[0]]],{
	   
	       seriesDefaults: {
	           renderer: $.jqplot.MeterGaugeRenderer,
	           rendererOptions: {
	           		//diameter:200, => no funciona pq no calcula _center
					intervalOuterRadius: 70, // semi circulo externo de la banda de colores 
					intervalInnerRadius:40,// semi circulo interno de la banda de colores
					hubRadius: 10, // radio circulo de la aguja
					needlePad:10, // igual al hubRadius para ver el circulo de la aguja completo
					needleThickness:6,			   
					padding:0, // distancia de la banda y el limite externo
					//shadowDepts:0,
					//NegNeedle: true,
					background:'white',
					ringColor:'transparent',			
 					//labelPosition : 'inside',
					tickColor:'black' ,
					needleColor:'#00ADEF',
					showTicks : true,
					ringWidth: .001, // radio perimetro externo
					min: 0,
					//max: 14,
					intervals:data.intervals,		
					ticks:data.ticks,		
					selectedClass: "jqplot-meterGauge-tick-selected "+data.selectedClass
					//intervalColors:['#f05c2f', '#f0d14f', '#009966']
	           }
	       }
	   });


}