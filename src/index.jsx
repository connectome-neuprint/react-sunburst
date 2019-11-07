import React from "react";
import PropTypes from "prop-types";
import isEqual from 'react-fast-compare';
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

  componentDidUpdate(prevProps) {
    const { sunburstObj } = this.state;
    const { data } = this.props;
    // if data is the same as before, then no reason to update the component
    if (isEqual(data, prevProps.data)) {
      return;
    }
    // clear out the existing graphics
    const node = this.sunburstRef.current;
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
    sunburstObj.setData(data).render(this.sunburstRef.current);
  }

  render() {
    return <div style={{display:'block', width: '100%', height: '100%'}} className="sunburst" ref={this.sunburstRef} />;
  }
}

Sunburst.defaultProps = {
  colors: null
};

Sunburst.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
    children: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
  }).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string)
};

export default Sunburst;
