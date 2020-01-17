import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateItem as updateItemAction } from '../../../actions';
import ContentBox from '../../atoms/ContentBox';
import CategoryTitle from '../../atoms/CategoryTitle';
import TextArea from '../../atoms/TextArea';

const FormDosageControl = ({ dosageControl, updateItem }) => {
  return (
    <ContentBox forms>
      <CategoryTitle>KONTROLA DAWKOWANIA</CategoryTitle>
      <TextArea
        name="dosageControl"
        onChange={e => updateItem(e.target.name, e.target.value)}
        value={dosageControl}
      />
    </ContentBox>
  );
};

FormDosageControl.propTypes = {
  dosageControl: PropTypes.string.isRequired,
  updateItem: PropTypes.func.isRequired,
};

const mapStateToProps = ({ dosageControl }) => ({ dosageControl });

const mapDispatchToProps = dispatch => ({
  updateItem: (itemName, value) => dispatch(updateItemAction(itemName, value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormDosageControl);
