function buildMyCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var myresultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var myResults = myresultArray[0];

    var ids = myResults.otu_ids;
    var labels = myResults.otu_labels;
    var values = myResults.sample_values;

    // Build a Bubble Chart
    var Layout = {
      title: "Bacteria Cultures",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 30}
    };
    var bubbleTrace = [
      {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
          size: values,
          color: ids,
        }
      }
    ];

    Plotly.newPlot("bubble", bubbleTrace, Layout);

    var xticks = ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    var barTrace = [
      {
        y: values.slice(0, 10),
        x: xticks,
        text: labels.slice(0, 10),
        type: "bar"
      }
    ];

    var Layout2 = {
      title: "Top 10 Bacteria Found",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", barTrace, Layout2);
  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var thesamplelist = data.names;

    thesamplelist.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var initialSample = thesamplelist[0];
    buildMyCharts(initialSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMyCharts(newSample);
}

// Initialize the dashboard
init();
