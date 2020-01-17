import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateItem as updateItemAction } from '../../../actions';
import ContentBox from '../../atoms/ContentBox';
import CategoryTitle from '../../atoms/CategoryTitle';
import TextArea from '../../atoms/TextArea';

const FormDescriptionOfPreparing = ({ descriptionOfPreparing, updateItem }) => {
  return (
    <ContentBox forms>
      <CategoryTitle>OPIS SPORZĄDZANIA LEKU</CategoryTitle>
      <TextArea
        name="descriptionOfPreparing"
        onChange={e => updateItem(e.target.name, e.target.value)}
        value={descriptionOfPreparing}
      />
    </ContentBox>
  );
};

FormDescriptionOfPreparing.propTypes = {
  descriptionOfPreparing: PropTypes.string.isRequired,
  updateItem: PropTypes.func.isRequired,
};

const mapStateToProps = ({ descriptionOfPreparing }) => ({
  descriptionOfPreparing,
});

const mapDispatchToProps = dispatch => ({
  updateItem: (itemName, value) => dispatch(updateItemAction(itemName, value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormDescriptionOfPreparing);
