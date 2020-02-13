function buildMyCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var myresultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var myResults = myresultArray[0];
    var ids = myResults.otu_ids;
    var labels = myResults.otu_labels;
    var values = myResults.sample_values;
    var Layout = {
      title: "Bacteria Cultures"
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
  var selector = d3.select("#selDataset");
  d3.json("samples.json").then((data) => {
    var thesamplelist = data.names;

    thesamplelist.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    var initialSample = thesamplelist[0];
    buildMyCharts(initialSample);
  });
}

function optionChanged(newSample) {
  buildMyCharts(newSample);
}
init();
