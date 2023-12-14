var sales = [{
    product: "Basketballs",
    units: 150
    }, {
    product: "Baseballs",
    units: 125
    }, {
    product: "Footballs",
    units: 300
    }];
let canvas = document.getElementById("canvas");
let context;
context = canvas.getContext("2d");

context.translate(0,0);
context.rotate(0);

// Vertical arrow

// Arrow small lines

context.beginPath();
context.moveTo(130,0);
context.lineTo(125,5);
context.stroke();

context.beginPath();
context.moveTo(130,0);
context.lineTo(135,5);
context.stroke();

// Arrow body

context.beginPath();
context.moveTo(130,0);
context.lineTo(130,380);
context.stroke();

// Horizontal arrow

// Arrow small lines

context.beginPath();
context.moveTo(550,380);
context.lineTo(545,375);
context.stroke();

context.beginPath();
context.moveTo(550,380);
context.lineTo(545,385);
context.stroke();

// Arrow body

context.beginPath();
context.moveTo(130,380);
context.lineTo(550,380);
context.stroke();

// Text

context.font = "bold 15px sans-serif";
context.fillText("Units",45,200);
context.fillText("Basketball",160,400);
context.fillText("Baseball",280,400);
context.fillText("Football",400,400);
context.fillText("Product",300,440);

// Boxes with gradient
// Create gradient

let grd = context.createLinearGradient(162, 0, 242, 0);
grd.addColorStop(0, "orange");
grd.addColorStop(1, "white");
context.fillStyle = grd;
context.fillRect(162,379,70,-(sales[0].units));
grd = context.createLinearGradient(275, 0, 350, 0);
grd.addColorStop(0, "blue");
grd.addColorStop(1, "white");
context.fillStyle = grd;
context.fillRect(275,379,70,-(sales[1].units));
grd = context.createLinearGradient(395, 0, 475, 0);
grd.addColorStop(0, "red");
grd.addColorStop(1, "white");
context.fillStyle = grd;
context.fillRect(395,379,70,-(sales[2].units));