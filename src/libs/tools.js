/**
 * @description 格式化时间
 * @param time
 * @param cFormat
 * @return {*}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (("" + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === "a")
      return ["一", "二", "三", "四", "五", "六", "日"][value - 1];
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
}

// ios 时间格式不能new date xxxx-xx-xx类型，需要转换下
/**
 *
 * @param {*} time
 */
export function getDateDiff(time) {
  //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
  // eslint-disable-next-line no-useless-escape
  return time.replace(/\-/g, "/");
}

/**
 * 格式化时间 2019/02/03(周五) 10:10
 * @param {*} time
 */
export function getWeek(time) {
  const week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  let date = new Date(getDateDiff(time));
  let result =
    getDateDiff(time.slice(0, 10)) +
    "(" +
    week[date.getDay()] +
    ")" +
    (time.length > 16
      ? time.substring(10, time.length - 3)
      : time.substring(10));

  return result;
}
