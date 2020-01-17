import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DropdownMenu from '../../atoms/DropdownMenu';
import DropdownItem from '../../atoms/DropdownItem';

const MainWrapperStyled = styled.div`
  position: relative;
`;

const Autocomplete = ({ children, inputFocused, onSelect, itemList }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentValue, setCurrentValue] = useState(null);
  const [menuFocused, setMenuFocused] = useState(false);

  const dropDownRef = useRef(null);

  const onKeyDown = ({ key }) => {
    if (itemList.length > 0) {
      const currentIndex = itemList.findIndex(
        item => item.name === selectedItem,
      );

      switch (key) {
        case 'ArrowDown':
          if (currentIndex < itemList.length - 1) {
            setSelectedItem(itemList[currentIndex + 1].name);
            if (
              dropDownRef.current.childNodes[currentIndex + 1].offsetTop >
              dropDownRef.current.scrollTop +
                dropDownRef.current.clientHeight -
                dropDownRef.current.childNodes[currentIndex + 1].clientHeight
            ) {
              dropDownRef.current.scrollTop +=
                dropDownRef.current.childNodes[currentIndex + 1].clientHeight;
            }
          } else {
            setSelectedItem(itemList[0].name);
            dropDownRef.current.scrollTop = 0;
          }
          break;

        case 'ArrowUp':
          if (currentIndex > 0) {
            setSelectedItem(itemList[currentIndex - 1].name);
            if (
              dropDownRef.current.childNodes[currentIndex - 1].offsetTop <
              dropDownRef.current.scrollTop
            ) {
              dropDownRef.current.scrollTop -=
                dropDownRef.current.childNodes[currentIndex - 1].clientHeight;
            }
          } else {
            setSelectedItem(itemList[itemList.length - 1].name);

            dropDownRef.current.scrollTop =
              dropDownRef.current.childNodes[itemList.length - 1].offsetTop;
          }
          break;

        case 'Enter':
          if (selectedItem !== null) {
            onSelect(selectedItem);
            setCurrentValue(selectedItem);
          }
          break;

        default:
          break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <MainWrapperStyled>
      {children}
      <DropdownMenu
        onMouseEnter={() => setMenuFocused(true)}
        onMouseLeave={() => setMenuFocused(false)}
        ref={dropDownRef}
        isVisible={
          currentValue !== children.props.value && (inputFocused || menuFocused)
        }
      >
        {itemList &&
          itemList.map(item => (
            // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
            <DropdownItem
              key={item.id}
              onMouseOver={() => setSelectedItem(item.name)}
              onClick={() => {
                onSelect(item.name);
                setCurrentValue(item.name);
                setMenuFocused(false);
              }}
              isSelected={selectedItem === item.name}
            >
              {item.name}
            </DropdownItem>
          ))}
      </DropdownMenu>
    </MainWrapperStyled>
  );
};

Autocomplete.propTypes = {
  children: PropTypes.element.isRequired,
  inputFocused: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  itemList: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ),
    PropTypes.array,
  ]).isRequired,
};

export default Autocomplete;
