import { ref } from "vue";

/**
 * 快速创建撒播图
 * @param colors 颜色数组
 * @returns
 */
export function createScatterOpts(colors: string[], opt: any): any {
    return {
        color: colors,
        grid: { top: "12%", right: "15%", left: "6%", bottom: "10%" },
        xAxis: [
            {
                name: "工作数量",
                type: "value",
                scale: true,
                axisLabel: { formatter: "{value}", showMinLabel: true, interval: 0 },
                splitLine: { show: false },
                // min: opt.xMin || 0,
                minInterval: 1,
            },
        ],
        yAxis: [
            {
                name: "累计积分",
                type: "value",
                scale: true,
                axisLabel: { formatter: "{value}", showMinLabel: true, interval: 0 },
                splitLine: { show: false },
                // min: opt.yMin || 0,
            },
        ],
        // tooltip: {},
    };
}

/**
 * 快速创建散播图 SeriesItem
 * @param values 数据源 可选
 * @returns
 */

interface markPoint {
    coord: number[];
    value: string;
}
export function createScatterSeriesItem(values?: any[], markPoints?: markPoint[]): any {
    const showMarkPoints = markPoints || [];
    // console.log("showMarkPoints: ", showMarkPoints);

    const seriesItem: any = {
        type: "scatter",
        symbolSize: 10,
        markPoint: {
            symbol: "rect",
            symbolSize: [50, 25],
            symbolOffset: [0, -20],
            slient: true,
            // https://echarts.apache.org/zh/option.html#series-scatter.markPoint.data
            data: [
                // {
                //     type: "average",
                // },
                // {
                //     name: "某个坐标",
                //     coord: markPoint?.coord || [],
                //     value: markPoint?.value || "",
                // },
                ...showMarkPoints,
            ],
        },
    };
    if (values) {
        seriesItem.data = values;
    }

    return seriesItem;
}
