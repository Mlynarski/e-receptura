import React from 'react';
import styled from 'styled-components';
import ContentBox from '../../components/atoms/ContentBox';

const RuleTitleStyled = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  margin: 15px;
`;

const RuleStyled = styled.p`
  font-size: 16px;
  text-align: left;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 5px;
`;

const PageRules = () => (
  <ContentBox>
    <RuleTitleStyled>Zasady korzystania</RuleTitleStyled>
    <RuleStyled>
      1. Twórca nie ponosi odpowiedzialności za użytkowanie generatora.
    </RuleStyled>
    <RuleStyled>
      2. Użytkownik jest zobowiązany do weryfikacji gotowego raportu.
    </RuleStyled>
    <RuleStyled>
      3. Dane podawane w generatorze nie są zbierane i przetwarzane przez serwer
      (generowanie pdf następuje po stronie użytkownika).
    </RuleStyled>
    <RuleStyled>4. Korzystanie z generatora jest darmowe.</RuleStyled>

    <RuleTitleStyled>Pliki cookies</RuleTitleStyled>
    <RuleStyled>
      Strona używa plików cookies w celach statystycznych. Użytkownik może w
      każdej chwili wyłączyć akceptowanie plików cookies w swojej przeglądarce.
    </RuleStyled>
  </ContentBox>
);

export default PageRules;
