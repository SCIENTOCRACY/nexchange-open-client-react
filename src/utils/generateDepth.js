export default (data, type) => {
    const parsedData = [];
    data.forEach((d) => {
        parsedData.push({
            size: type === 'SELL' ? parseFloat(d.amount_base) : parseFloat(d.amount_quote),
            rate: parseFloat(d.limit_rate),
        });
    })

    let depth = _(parsedData)
    .groupBy('rate')
    .map((order, rate) => ({
      rate: parseFloat(rate),
      size: _.sumBy(order, 'size'),
    }))
    .value()

    depth = _.sortBy(depth, 'rate');
    if(type === 'SELL'){
        depth = depth.reverse();
    }

    return depth;
};
  