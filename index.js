(function () {

    let toolContainer = document.querySelector(".tool-container");
    let pencil = document.querySelector(".pencil");
    let eraser = document.querySelector(".eraser");
    let notepad = document.querySelector(".notepad");
    let download = document.querySelector(".download");
    let upload = document.querySelector(".upload");
    let drawable = document.querySelector(".drawable");
    let canvasBoard = document.querySelector("canvas");
    let body = document.querySelector("body");
    let color1 = document.querySelector(".color1");
    let color2 = document.querySelector(".color2");
    let color3 = document.querySelector(".color3");
    let size1 = document.querySelector(".size1");
    let size2 = document.querySelector(".size2");
    let size3 = document.querySelector(".size3");
    let templates = document.querySelector("#pageTemplates");
    let cleanCanvas = document.querySelector('.cleanCanvas');
    cleanCanvas.addEventListener("click", makeNewCanvas);


    let tool = canvasBoard.getContext("2d");
    let toolColor = "black";
    tool.lineCap = 'round'
    let close = false;
    let ix, iy, fx, fy;
    let toolSize = 2;
    let id = 0;    // tool.fill
    canvasBoard.width = window.innerWidth;
    canvasBoard.height = window.innerHeight;
    let isPencilClicked = false;
    pencil.addEventListener("click", pencilHandler);
    eraser.addEventListener("click", eraserHandler);
    function makeNewCanvas() {
        tool.clearRect(0, 0, canvasBoard.width, canvasBoard.height);
    }
    notepad.addEventListener("click", addSticky);
    function addSticky() {
        let divSticky = templates.content.querySelector(".sticky");
        let sticky = document.importNode(divSticky, true);
        drawable.appendChild(sticky);
        let stickyBar = sticky.querySelector(".stickybar");
        let minimize = sticky.querySelector('[action = "minimize"]');
        let maximize = sticky.querySelector('[action = "maximize"]');

        let close = sticky.querySelector('[action = "close"]');
        minimize.addEventListener("click", minSticky);
        maximize.addEventListener("click", maxSticky);
        close.addEventListener("click", closeSticky);


        let stickyMover = sticky.querySelector('.stickymover');
        stickyMover.addEventListener("mousedown", function () {
            stickyMover.addEventListener("mousemove", update);
            stickyMover.addEventListener("mouseup", () => {
                stickyMover.removeEventListener("mousemove", update);
            })
        })
        function update(ev) {
            console.log(ev.x);
            let x = ev.x - 165;
            let y = ev.y - 25;

            ans = x + "px";
            ansy = y + "px";
            sticky.style.setProperty("left", ans);
            sticky.style.setProperty("top", ansy);
        }
      
    }

    download.addEventListener("click", downloadHandler);
    function downloadHandler() {
        let fileName = prompt("Enter File Name");
        if (fileName == null) {
            alert("Invalid");
            return;
        }
        fileName = fileName.trim();
        if (!fileName) {
            return;
        }
        let image = canvasBoard.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
        let link = document.createElement('a');
        link.download = fileName + ".png";
        link.href = image;
        link.click();
        link.remove();
    }
    function eraserHandler() {
        tool.strokeStyle = "white";
        tool.lineWidth = 10;
    }
    let drawingMode = false;
    function pencilHandler() {
        toolColor = "black";
        toolSize = 2;
        if (isPencilClicked == true) {
            return;
        }
        isPencilClicked = true;
        let boardTop = canvasBoard.getBoundingClientRect().top;
        let boardLeft = canvasBoard.getBoundingClientRect().left;

        if (drawingMode == false) {
            drawingMode = true;
        }
        else if (drawingMode == true) {
            drawingMode == false;
        }
        if (drawingMode == true) {
            console.log(boardLeft + "," + boardTop + "," + drawingMode);
        }
        ix = 0;
        fx = 0;
        fy = 0;
        iy = 0;

        pencilWorker(+boardLeft, +boardTop);
    }
    function pencilWorker(boardLeft, boardTop) {
        ix = 0;
        iy = 0;
        fx = 0;
        fy = 0;
        canvasBoard.addEventListener("mousedown", function (e) {
            ix = e.clientX - boardLeft;
            iy = e.clientY - boardTop;
            tool.beginPath();
            tool.moveTo(ix, iy);
            drawingMode = true;
        })
        canvasBoard.addEventListener("mousemove", function (e) {
            if (drawingMode == false) {
                return;
            }
            fx = e.clientX - boardLeft;
            fy = e.clientY - boardTop;


            tool.lineTo(fx, fy);
            // tool.strokeStyle = toolColor;
            // tool.lineWidth = toolSize;
            tool.stroke();
            ix = fx;
            iy = fy;

        })
        canvasBoard.addEventListener("mouseup", function (e) {
            drawingMode = false;
        })
    }

    function minSticky() {
        let sticky = this.parentNode.parentNode;
        let textArea = sticky.querySelector("textarea");
        console.log(textArea.value);
        textArea.style.display = "none";
    }
    function maxSticky() {
        let sticky = this.parentNode.parentNode;
        let textArea = sticky.querySelector("textarea");
        console.log(textArea.value);
        textArea.style.display = "block";
    }
    function closeSticky() {
        let sticky = this.parentNode.parentNode;
        drawable.removeChild(sticky);
    }


    size1.addEventListener("click", function () {
        toolSize = 2;
        tool.lineWidth = 2;
    })
    size2.addEventListener("click", function () {
        toolSize = 3;
        tool.lineWidth = 3;
    })
    size3.addEventListener("click", function () {
        toolSize = 6;
        tool.lineWidth = 6;
    })
    color1.addEventListener("click", function () {
        toolColor = "lightpink";
        tool.strokeStyle = "lightpink";
        console.log(tool.strokeStyle);
    })
    color2.addEventListener("click", function () {
        tool.strokeStyle = "lightgreen";
    })
    color3.addEventListener("click", function () {
        tool.strokeStyle = "black";
    })

})();