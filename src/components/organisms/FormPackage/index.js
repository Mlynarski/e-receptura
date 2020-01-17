import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  updateItem as updateItemAction,
  clearPackage as clearPackageAction,
} from '../../../actions';
import ContentBox from '../../atoms/ContentBox';
import CategoryTitle from '../../atoms/CategoryTitle';
import ItemLabel from '../../molecules/ItemLabel';
import Select from '../../atoms/Select';
import TextInput from '../../atoms/TextInput';

const FormPackage = ({
  packageType,
  capsulesExpiryDate,
  capsulesType,
  capsulesSerialNumber,
  finalCheck,
  updateItem,
  clearPackage,
}) => {
  // handle change
  const handleChange = event => {
    const { name, value } = event.target;
    const re = /^[0-9]*$/;

    switch (name) {
      case 'packageType':
        updateItem(name, value);
        if (value === 'KAPSUŁKI') {
          clearPackage();
        }
        break;

      case 'capsulesSerialNumber':
        if (value === '' || re.test(value)) {
          updateItem(name, value);
        }
        break;

      default:
        updateItem(name, value);
        break;
    }
  };

  return (
    <ContentBox forms>
      <CategoryTitle>OPAKOWANIE</CategoryTitle>
      <ItemLabel label="RODZAJ OPAKOWANIA:" labelWidth={300} row>
        <Select
          name="packageType"
          value={packageType}
          onChange={handleChange}
          width={300}
        >
          <option value="AMPUŁKA">AMPUŁKA</option>
          <option value="BUTELKA">BUTELKA</option>
          <option value="BUTELKA Z SZEROKĄ SZYJKĄ">
            BUTELKA Z SZEROKĄ SZYJKĄ
          </option>
          <option value="BUTELKA Z ZAKRAPLACZEM">BUTELKA Z ZAKRAPLACZEM</option>
          <option value="FIOLKA">FIOLKA</option>
          <option value="FORMA DO CZOPKÓW">FORMA DO CZOPKÓW</option>
          <option value="FORMA DO GLOBULEK">FORMA DO GLOBULEK</option>
          <option value="KAPSUŁKI">KAPSUŁKI</option>
          <option value="MINIMSY">MINIMSY</option>
          <option value="POJEMNIK DO MAŚCI OCZNEJ">
            POJEMNIK DO MAŚCI OCZNEJ
          </option>
          <option value="PUDEŁKO DO CZOPKÓW">PUDEŁKO DO CZOPKÓW</option>
          <option value="TOREBKA DO PROSZKÓW">TOREBKA DO PROSZKÓW</option>
          <option value="TUBA MAŚCIOWA">TUBA MAŚCIOWA</option>
        </Select>
      </ItemLabel>
      {packageType === 'KAPSUŁKI' && (
        <>
          <ItemLabel label="DATA WAŻNOŚCI KAPSUŁEK:" labelWidth={300} row>
            <TextInput
              name="capsulesExpiryDate"
              onChange={handleChange}
              value={capsulesExpiryDate}
              error={
                finalCheck && capsulesExpiryDate === ''
                  ? 'PROSZĘ UZUPEŁNIĆ'
                  : ''
              }
              width={300}
              type="date"
            />
          </ItemLabel>
          <ItemLabel label="TYP KAPSUŁEK:" labelWidth={300} row>
            <Select
              name="capsulesType"
              value={capsulesType}
              onChange={handleChange}
              width={300}
            >
              <option value="ŻELATYNOWE">ŻELATYNOWE</option>
              <option value="SKROBIOWE">SKROBIOWE</option>
            </Select>
          </ItemLabel>
          <ItemLabel label="NUMER SERII KAPSUŁEK:" labelWidth={300} row>
            <TextInput
              name="capsulesSerialNumber"
              onChange={handleChange}
              value={capsulesSerialNumber}
              error={
                finalCheck && capsulesSerialNumber === ''
                  ? 'PROSZĘ UZUPEŁNIĆ'
                  : ''
              }
              width={300}
            />
          </ItemLabel>
        </>
      )}
    </ContentBox>
  );
};

FormPackage.propTypes = {
  packageType: PropTypes.string.isRequired,
  capsulesExpiryDate: PropTypes.string.isRequired,
  capsulesType: PropTypes.string.isRequired,
  capsulesSerialNumber: PropTypes.string.isRequired,
  finalCheck: PropTypes.bool.isRequired,
  updateItem: PropTypes.func.isRequired,
  clearPackage: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  packageType,
  capsulesExpiryDate,
  capsulesType,
  capsulesSerialNumber,
  finalCheck,
}) => ({
  packageType,
  capsulesExpiryDate,
  capsulesType,
  capsulesSerialNumber,
  finalCheck,
});

const mapDispatchToProps = dispatch => ({
  updateItem: (itemName, value) => dispatch(updateItemAction(itemName, value)),
  clearPackage: () => dispatch(clearPackageAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormPackage);
