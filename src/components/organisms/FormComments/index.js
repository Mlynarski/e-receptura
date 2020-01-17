import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateItem as updateItemAction } from '../../../actions';
import ContentBox from '../../atoms/ContentBox';
import CategoryTitle from '../../atoms/CategoryTitle';
import TextArea from '../../atoms/TextArea';

const FormComments = ({ comments, updateItem }) => {
  return (
    <ContentBox forms>
      <CategoryTitle>UWAGI</CategoryTitle>
      <TextArea
        name="comments"
        onChange={e => updateItem(e.target.name, e.target.value)}
        value={comments}
      />
    </ContentBox>
  );
};

FormComments.propTypes = {
  comments: PropTypes.string.isRequired,
  updateItem: PropTypes.func.isRequired,
};

const mapStateToProps = ({ comments }) => ({ comments });

const mapDispatchToProps = dispatch => ({
  updateItem: (itemName, value) => dispatch(updateItemAction(itemName, value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormComments);
