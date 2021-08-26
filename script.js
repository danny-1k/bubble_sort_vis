window.onload = () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    var num = document.querySelectorAll('.bar').length;
    var bars = Array(num);
    var stopped = false;
    layout_bars();
    document.querySelector('#num').addEventListener('input', () => { layout_bars() });
    document.querySelector('#randomize').addEventListener('click', () => { randomize() });
    document.querySelector('#bubble_sort').addEventListener('click', () => { bubble_sort() });
    document.querySelector('.stop').addEventListener('click', () => stopped = true)
    function randomize() {
        for (var i = 0; i < bars.length; i++) {
            bars[i] = Math.ceil(Math.random() * num);
        };
        //console.log(bars);
        display_bars();
    };

    function layout_bars() {
        var n = document.querySelector('#num').value;
        var container = document.querySelector('.container');
        container.innerHTML = '';
        for (i = 0; i < n; i++) {
            var b = document.createElement("div");
            b.className = "bar";
            container.appendChild(b);
        }
        num = document.querySelectorAll('.bar').length;
        bars = Array(num);
        sorted = bars;
    }

    function display_bars(highlight, sorted_idx) {
        if (highlight) {
            for ([i, bar] of document.querySelectorAll('.bar').entries()) {
                if (highlight === i) {
                    bar.style.backgroundColor = "rgb(226, 13, 41)";
                } else {
                    if (i < document.querySelectorAll('.bar').length - sorted_idx) {
                        bar.style.backgroundColor = "dodgerblue";
                    }
                }
            };
            for ([i, bar] of document.querySelectorAll('.bar').entries()) {
                bar.style.height = bars[i] + "px";
            };
        } else {
            for ([i, bar] of document.querySelectorAll('.bar').entries()) {
                bar.style.height = bars[i] + "px";
            };
        }
    };


    var bubble_sort = async () => {
        stopped = false;
        var sorted = bars;
        sorted_idx = 0;
        is_sorted = false;
        while (!stopped) {
            var changed = false;
            for (var i = 0; i < sorted.length; i++) {
                var j = sorted[i];
                var k = sorted[i + 1];
                if (i !== sorted.length - 1) {
                    if (k < j) {
                        sorted[i] = k;
                        sorted[i + 1] = j;
                        changed = true;
                        bars = sorted;
                        display_bars(highlight = i + 1, sorted_idx);
                        await delay(document.querySelector('#speed').value);
                    };
                };
            };
            //console.log(document.querySelectorAll('.bar'));
            //console.log(sorted.length);
            document.querySelectorAll('.bar')[(sorted.length - 1) - sorted_idx].style.backgroundColor = "rgb(13, 226, 42)";
            sorted_idx++;

            if (!changed) {
                bars = sorted;
                display_bars();
                is_sorted = true
                break;
            };
        };
        if (is_sorted) {
            document.querySelectorAll('.bar').forEach((el) => { el.style.backgroundColor = "rgb(13, 226, 42)"; })

        }
    };
};