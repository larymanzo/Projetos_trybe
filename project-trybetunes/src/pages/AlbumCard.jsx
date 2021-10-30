import React from 'react';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { artistName, collectionName, title } = this.props;
    return (
      <section className="Card">
        <h3 data-testid="artist-name">
          {artistName}
        </h3>
        <p data-testid="album-name">{title}</p>
        <p>{collectionName}</p>
      </section>);
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string,
  collectionName: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default AlbumCard;
