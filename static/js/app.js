
function Plots(id) {
    //reading in json data
    d3.json('../samples.json').then(sampledata =>{
        //console.log(sampledata)

    var ids = sampledata.samples[0].otu_ids;
    var subjID = sampledata.samples.filter(d => d.id.toString() === id)[0];  
    //console.log(ids);
    //console.log(subjID);

    var sampleValues = subjID.sample_values.slice(0,10);
    //console.log(sampleValues)

    var allLabels = sampledata.samples[0].otu_labels; 
    var labels = subjID.otu_labels.slice(0,10);
    //console.log(labels);
    
    
    //top 10 OTU's
    var TopOtu = (subjID.otu_ids.slice(0,10));
    //console.log(TopOtu);
    
    //making the Top Otu's look pretty
    var otuID = TopOtu.map(num => "OTU #" + num);
    //console.log(otuID);

       
    
    //Prepping bar chart
        var trace = {
                    x: sampleValues,
                    y: otuID,
                    text: labels,
                    type: 'bar',
                    orientation: 'h'
        };

        var layout = {
                    title: "Top OTU's",
                    yaxis: {tickmode: 'linear'},
                    margin: {
                            l:75,
                            r:75,
                            t:75,
                            b:30
                    }
        };
        //Plotting Bar chart
        Plotly.newPlot('bar', [trace], layout);



    //Prepping Bubble Chart
        var bubTrace = {
                        x: TopOtu,
                        y: sampleValues,
                        mode: "markers",
                        marker: {
                                size: sampleValues,
                                color: ids
                        },
                        text: labels
        };

        var bubLayout = {
                        xaxis:{title: "Otu ID"},
                        yaxis:{title: "Sample Values"},
                        height: 600,
                        width: 1000
        };

        //Plotting BubbleChart
        Plotly.newPlot('bubble', [bubTrace], bubLayout);
    });
}

function getInfo(id) {
    d3.json('../samples.json').then(data =>{

        var metadata = data.metadata;
        //console.log(metadata)

        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        //console.log(result);
        var demoInfo = d3.select("#sample-metadata");

        demoInfo.html("");

        Object.entries(result).forEach((key) => {
            demoInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

function optionChanged(id) {
    getInfo(id);
    Plots(id);
}


function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("../samples.json").then(data => {
        //console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        Plots(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();