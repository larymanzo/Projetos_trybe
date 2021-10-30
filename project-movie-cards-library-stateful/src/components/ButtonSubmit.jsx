import React from 'react';
import PropTypes from 'prop-types';

class ButtonSubmit extends React.Component {
  render() {
    const { onClick } = this.props;
    return (
      <button
        data-testid="send-button"
        type="submit"
        onClick={ onClick }
      >
        Adicionar filme
      </button>
    );
  }
}

ButtonSubmit.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonSubmit;
