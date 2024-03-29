import { createBarOpts, createBarSeriesItem, BarDirectionEnum } from "./bar/bar.opt";
import { createGradientColors, BBColors } from "./base/color.opt";
import { createLineOpts, createLineSeriesItem } from "./line/line.opt";
import { createPieOpts, createPieSeriesItem } from "./pie/pie.opt";
import { createScatterOpts, createScatterSeriesItem } from "./scatter/scatter.opt";

export {
    // 渐变色
    createGradientColors,
    // 柱状图
    BarDirectionEnum,
    createBarOpts,
    createBarSeriesItem,
    // 饼图
    createPieOpts,
    createPieSeriesItem,
    // 折线图
    createLineOpts,
    createLineSeriesItem,
    // 散播图
    createScatterOpts,
    createScatterSeriesItem,
};
export type { BBColors };
