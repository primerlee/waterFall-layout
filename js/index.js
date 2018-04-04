window.onload = function () {

    waterFall("main", "box");

    var dataInt = {
        "data": [
            {"src": "26.jpg"},
            {"src": "27.jpg"},
            {"src": "28.jpg"},
            {"src": "29.jpg"},
            {"src": "30.jpg"}
        ]
    };
    window.onscroll = function () {
        var oParent = document.getElementById("main");
        if (checkScroll()) {
            for (var i = 0; i < dataInt.data.length; i++) {
                var oBox = document.createElement("div");
                oBox.className = "box";
                oParent.appendChild(oBox);

                var oPic = document.createElement("div");
                oPic.className="pic";
                oBox.appendChild(oPic);

                var oImg = document.createElement("img");
                oImg.src="./images/"+dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
        }
        waterFall("main", "box"); // 重新渲染一遍
    }
};

function waterFall(parent, cls) {
    var oParent = document.getElementById(parent);
    var aBox = getByClass(oParent, cls);

    var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var oBoxWidth = aBox[0].offsetWidth;
    var cols = Math.floor(clientWidth / oBoxWidth); // 列数
    oParent.style.cssText = "width: " + cols * oBoxWidth + "px; margin: 0 auto";  // 设置main的宽度和水平居中对齐

    // box盒子的高度数组集合
    var boxHeightArr = [];

    for (var i = 0; i < aBox.length; i++) {
        var boxHeight = aBox[i].offsetHeight;
        if (i < cols) {
            boxHeightArr[i] = boxHeight;
        } else {
            var minHeightBox = Math.min.apply(null, boxHeightArr);
            var minHeightIndex = getIndex(boxHeightArr, minHeightBox);

            aBox[i].style.position = "absolute";
            aBox[i].style.top = minHeightBox + "px";
            aBox[i].style.left = aBox[minHeightIndex].offsetLeft + "px";

            boxHeightArr[minHeightIndex] += aBox[i].offsetHeight;

        }
    }
}

function getIndex(arrHeight, minHeight) {
    for (var i = 0; i < arrHeight.length; i++) {
        if (arrHeight[i] === minHeight) {
            return i;
        }
    }
}

function getByClass(parent, className) {
    var classArr = [];
    var aChildren = parent.getElementsByTagName("*");
    for (var i = 0; i < aChildren.length; i++) {
        if (aChildren[i].className === className) {
            classArr.push(aChildren[i]);
        }
    }
    return classArr;
}

function checkScroll() {
    var oParent = document.getElementById("main");
    var aChildren = getByClass(oParent, "box");
    var lastBoxHeight = aChildren[aChildren.length - 1].offsetTop + aChildren[aChildren.length - 1].offsetHeight / 2;
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    return (lastBoxHeight > clientHeight + scrollTop) ? false : true;

}