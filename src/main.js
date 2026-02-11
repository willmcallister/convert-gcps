import './style.css'

document.getElementById("convertBtn").onclick = function () { 

    // Read in text from textarea
    let input = document.getElementById("allmaps_gcp_input").value;

    // Split input by newline
    let lines = input.split('\n');
    let outputCoords = ''

    // For each line change from space to comma deliniated, reorder coords,
    // and flip the sign of sourceY
    for (let n = 0; n < lines.length; n++) {
        // change from space to comma deliniated
        lines[n] = lines[n].replaceAll(' ', ',')

        // split by comma
        let currentLine = lines[n].split(',')

        // reorder and flip the sign of sourceY
        // input: sourceX,sourceY,mapX,mapY
        // output: mapX,mapY,sourceX,sourceY
        let reorderedLine = currentLine[2] + ',' + currentLine[3] + ',' + currentLine[0] + ',' + -Number(currentLine[1])
        outputCoords += reorderedLine + '\n'
    }

    // Building output
    const qgisCRS = '#CRS: GEOGCRS["WGS 84",ENSEMBLE["World Geodetic System 1984 ensemble",MEMBER["World Geodetic System 1984 (Transit)"],MEMBER["World Geodetic System 1984 (G730)"],MEMBER["World Geodetic System 1984 (G873)"],MEMBER["World Geodetic System 1984 (G1150)"],MEMBER["World Geodetic System 1984 (G1674)"],MEMBER["World Geodetic System 1984 (G1762)"],ELLIPSOID["WGS 84",6378137,298.257223563,LENGTHUNIT["metre",1]],ENSEMBLEACCURACY[2.0]],PRIMEM["Greenwich",0,ANGLEUNIT["degree",0.0174532925199433]],CS[ellipsoidal,2],AXIS["geodetic latitude (Lat)",north,ORDER[1],ANGLEUNIT["degree",0.0174532925199433]],AXIS["geodetic longitude (Lon)",east,ORDER[2],ANGLEUNIT["degree",0.0174532925199433]],USAGE[SCOPE["Horizontal component of 3D system."],AREA["World."],BBOX[-90,-180,90,180]],ID["EPSG",4326]]'
    const qgisVarHeader = 'mapX,mapY,sourceX,sourceY'

    const output = qgisCRS + '\n' + qgisVarHeader + '\n' + outputCoords

    // Put result in pre element
    const pre  = document.getElementById("resultGCPOutput")
    pre.innerHTML = output

    // let filename = 'test.points'
    // let element = document.createElement('a');
    // element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output));
    // element.setAttribute('download', filename);

    // element.style.display = 'none';

    // element.click();
};


document.getElementById('download-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let filename = this.elements['name'].value;
    if (!filename.endsWith('.points')) {
        filename += '.points';
    }
    const output = document.getElementById('resultGCPOutput').textContent;

    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output));
    element.setAttribute('download', filename);
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
});