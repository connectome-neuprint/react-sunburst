import React from "react";
import PropTypes from "prop-types";
import SunburstObject from "@neuprint/sunburst";

class Sunburst extends React.Component {
  constructor(props) {
    super(props);
    this.sunburstRef = React.createRef();
    this.sunburstObj = null;
  }

  componentDidMount() {
    const { data, colors } = this.props;
    const sunburst = new SunburstObject({
      colors
    });
    sunburst.setData(data).render(this.sunburstRef.current);
    this.setState({ sunburstObj: sunburst });
  }

  componentDidUpdate() {
    const { sunburstObj } = this.state;
    const { data } = this.props;
    sunburstObj.setData(data).render(this.sunburstRef.current);
  }

  render() {
    return <div className="sunburst" ref={this.sunburstRef} />;
  }
}

Sunburst.defaultProps = {
  colors: null
};

Sunburst.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
  }).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string)
};

export default Sunburst;
