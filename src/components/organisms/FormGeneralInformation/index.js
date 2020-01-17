import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateItem as updateItemAction } from '../../../actions';
import ContentBox from '../../atoms/ContentBox';
import CategoryTitle from '../../atoms/CategoryTitle';
import FlexWrapper from '../../atoms/FlexWrapper';
import TextInput from '../../atoms/TextInput';
import ItemLabel from '../../molecules/ItemLabel';

const ContentBoxStyled = styled(ContentBox)`
  @media (max-width: 950px) {
    max-width: 460px;
  }
`;

const FormGeneralInformation = ({
  serialNumber,
  prescriptionNumber,
  getDate,
  preparationDate,
  finalCheck,
  updateItem,
}) => {
  // handle change
  const handleChange = event => {
    const { name, value } = event.target;
    const re = /^[0-9]*$/;

    switch (name) {
      case 'serialNumber':
      case 'prescriptionNumber':
        if (value === '' || re.test(value)) {
          updateItem(name, value);
        }
        break;

      default:
        updateItem(name, value);
    }
  };
  return (
    <ContentBoxStyled forms>
      <CategoryTitle>INFORMACJE OGÓLNE</CategoryTitle>
      <FlexWrapper direction="row">
        <FlexWrapper direction="row">
          <ItemLabel label="NUMER PORZĄDKOWY:" margin={5} width={210}>
            <TextInput
              name="serialNumber"
              value={serialNumber}
              onChange={handleChange}
              error={
                finalCheck && serialNumber === '' ? 'PROSZĘ UZUPEŁNIĆ' : ''
              }
            />
          </ItemLabel>
          <ItemLabel label="NUMER RECEPTY:" margin={5} width={210}>
            <TextInput
              name="prescriptionNumber"
              value={prescriptionNumber}
              onChange={handleChange}
              error={
                finalCheck && prescriptionNumber === ''
                  ? 'PROSZĘ UZUPEŁNIĆ'
                  : ''
              }
            />
          </ItemLabel>
        </FlexWrapper>
        <FlexWrapper direction="row">
          <ItemLabel label="DATA PRZYJĘCIA RECEPTY:" margin={5} width={210}>
            <TextInput
              name="getDate"
              value={getDate}
              onChange={handleChange}
              error={finalCheck && getDate === '' ? 'PROSZĘ UZUPEŁNIĆ' : ''}
              type="date"
            />
          </ItemLabel>
          <ItemLabel label="DATA SPORZĄDZENIA LEKU:" margin={5} width={210}>
            <TextInput
              name="preparationDate"
              value={preparationDate}
              onChange={handleChange}
              error={
                finalCheck && preparationDate === '' ? 'PROSZĘ UZUPEŁNIĆ' : ''
              }
              type="date"
            />
          </ItemLabel>
        </FlexWrapper>
      </FlexWrapper>
    </ContentBoxStyled>
  );
};

FormGeneralInformation.propTypes = {
  serialNumber: PropTypes.string.isRequired,
  prescriptionNumber: PropTypes.string.isRequired,
  getDate: PropTypes.string.isRequired,
  preparationDate: PropTypes.string.isRequired,
  finalCheck: PropTypes.bool.isRequired,
  updateItem: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  serialNumber,
  prescriptionNumber,
  getDate,
  preparationDate,
  finalCheck,
}) => ({
  serialNumber,
  prescriptionNumber,
  getDate,
  preparationDate,
  finalCheck,
});

const mapDispatchToProps = dispatch => ({
  updateItem: (itemName, value) => dispatch(updateItemAction(itemName, value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormGeneralInformation);
