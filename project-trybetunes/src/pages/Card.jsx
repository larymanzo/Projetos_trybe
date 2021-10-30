import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const { title, artistName, image, collectionId } = this.props;
    return (
      <section className="Card">
        <h3>
          {artistName}
        </h3>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ ` link-to-album-${collectionId}` }
        >
          {title}
        </Link>
        <p>{artistName}</p>
        <img src={ image } alt="Capa do Álbum" />
      </section>);
  }
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default Card;
