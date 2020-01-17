import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setFinalCheck as setFinalCheckAction,
  clearForm as clearFormAction,
} from '../../actions';
import PageTitle from '../../components/atoms/PageTitle';
import FormGeneralInformation from '../../components/organisms/FormGeneralInformation';
import FormIngredients from '../../components/organisms/FormIngredients';
import FormDosageControl from '../../components/organisms/FormDosageControl';
import FormDescriptionOfPreparing from '../../components/organisms/FormDescriptionOfPreparing';
import FormPackage from '../../components/organisms/FormPackage';
import FormStorageConditions from '../../components/organisms/FormStorageConditions';
import FormComments from '../../components/organisms/FormComments';
import FlexWrapper from '../../components/atoms/FlexWrapper';
import Button from '../../components/atoms/Button';
import generatePdf from '../../pdf';

const PageGenerator = ({ setFinalCheck, clearForm }) => (
  <>
    <PageTitle>GENERATOR PROTOKOŁU SPORZĄDZANIA LEKU RECEPTUROWEGO</PageTitle>
    <FormGeneralInformation />
    <FormIngredients />
    <FormDosageControl />
    <FormDescriptionOfPreparing />
    <FormPackage />
    <FormStorageConditions />
    <FormComments />
    <FlexWrapper direction="row">
      <Button
        margin={15}
        width={150}
        height={30}
        onClick={() => {
          setFinalCheck(true);
          generatePdf();
        }}
      >
        GENERUJ PDF
      </Button>
      <Button margin={15} width={150} height={30} onClick={() => clearForm()}>
        RESETUJ FORMULARZ
      </Button>
    </FlexWrapper>
  </>
);

PageGenerator.propTypes = {
  setFinalCheck: PropTypes.func.isRequired,
  clearForm: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setFinalCheck: value => dispatch(setFinalCheckAction(value)),
  clearForm: () => dispatch(clearFormAction()),
});

export default connect(
  null,
  mapDispatchToProps,
)(PageGenerator);
