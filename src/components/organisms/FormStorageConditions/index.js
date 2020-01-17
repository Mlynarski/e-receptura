import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateItem as updateItemAction } from '../../../actions';
import ContentBox from '../../atoms/ContentBox';
import CategoryTitle from '../../atoms/CategoryTitle';
import ItemLabel from '../../molecules/ItemLabel';
import TextInput from '../../atoms/TextInput';
import Select from '../../atoms/Select';
import Checkbox from '../../atoms/Checkbox';

const FormStorageConditions = ({
  shelfLife,
  temperature,
  shaded,
  finalCheck,
  updateItem,
}) => {
  // handle change
  const handleChange = event => {
    const { name, value, checked } = event.target;

    if (name === 'shaded') {
      updateItem(name, checked);
    } else {
      updateItem(name, value);
    }
  };

  return (
    <ContentBox forms>
      <CategoryTitle>WARUNKI PRZECHOWYWANIA</CategoryTitle>
      <ItemLabel label="OKRES PRZYDATNOŚCI DO UŻYCIA:" labelWidth={300} row>
        <TextInput
          name="shelfLife"
          onChange={handleChange}
          value={shelfLife}
          error={finalCheck && shelfLife === '' ? 'PROSZĘ UZUPEŁNIĆ' : ''}
          width={300}
          type="date"
        />
      </ItemLabel>
      <ItemLabel label="TEMPERATURA PRZECHOWYWANIA:" labelWidth={300} row>
        <Select
          name="temperature"
          value={temperature}
          onChange={handleChange}
          width={300}
        >
          <option value="POKOJOWA 15-25 °C">POKOJOWA 15-25 [°C]</option>
          <option value="CHŁODNE MIEJSCE 8-15 °C">
            CHŁODNE MIEJSCE 8-15 [°C]
          </option>
          <option value="LODÓWKA 2-8 °C">LODÓWKA 2-8 [°C]</option>
          <option value="ZAMRAŻARKA PONIŻEJ -15 °C">
            ZAMRAŻARKA PONIŻEJ -15 [°C]
          </option>
        </Select>
      </ItemLabel>
      <ItemLabel label="W ZACIEMNIONYM MIEJSCU:" row center>
        <Checkbox name="shaded" checked={shaded} onChange={handleChange} />
      </ItemLabel>
    </ContentBox>
  );
};

FormStorageConditions.propTypes = {
  shelfLife: PropTypes.string.isRequired,
  temperature: PropTypes.string.isRequired,
  shaded: PropTypes.bool.isRequired,
  finalCheck: PropTypes.bool.isRequired,
  updateItem: PropTypes.func.isRequired,
};

const mapStateToProps = ({ shelfLife, temperature, shaded, finalCheck }) => ({
  shelfLife,
  temperature,
  shaded,
  finalCheck,
});

const mapDispatchToProps = dispatch => ({
  updateItem: (itemName, value) => dispatch(updateItemAction(itemName, value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormStorageConditions);
