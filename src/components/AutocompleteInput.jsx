import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Autosuggest from "react-autosuggest";
import languages from "context/languages";

import AppContext from "context/AppContext";

import warningIcon from "assets/icons/warning.svg";

const FormWrapper = styled.form`
  margin-top: 15px;
  height: 40px;
  max-width: 1200px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  z-index: 10;
`;

const AutoCompleteItem = styled.div`
  padding: 10px 20px;
  background-color: #fff;
  color: #000;
  font-size: 15px;
  list-style: none;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

const Info = styled(AutoCompleteItem)`
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  cursor: auto;

  &::after {
    content: "";
    display: block;
    width: 20px;
    height: 17px;
    background-image: url(${warningIcon});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

const AutocompleteInput = ({ listView }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showHints, setShowHints] = useState(false);

  const { value, setValue, searchPhoto } = useContext(AppContext);

  const history = useHistory();

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : languages.filter(
          (lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => {
    return (
      <AutoCompleteItem onClick={(e) => handleOnSubmit(e, suggestion.name)}>
        {suggestion.name}
      </AutoCompleteItem>
    );
  };

  const onChange = (event, { newValue }) => setValue(newValue);

  const onSuggestionsFetchRequested = ({ value }) =>
    setSuggestions(getSuggestions(value));

  const onSuggestionsClearRequested = () => setSuggestions([]);

  const shouldRenderSuggestions = (value, reason) => {
    return value.trim().length > 2;
  };

  const handleOnSubmit = (e, stringName) => {
    e.preventDefault();
    if (!listView) {
      history.push("/photos");
    }
    searchPhoto(e, stringName);
    setShowHints(false);
  };

  const onFocus = () => {
    setShowHints(true);
  };

  const onBlur = () => {
    setShowHints(false);
  };

  const inputProps = {
    placeholder: "Search free high-resolution photo",
    value,
    onChange,
    id: "searchInput",
    onFocus,
    onBlur,
  };

  const renderInfoWithoutHints =
    !suggestions.length && showHints && value.length > 2 ? (
      <Info>No similar suggestions</Info>
    ) : null;

  return (
    <FormWrapper onSubmit={(e) => handleOnSubmit(e, value)}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        shouldRenderSuggestions={shouldRenderSuggestions}
        inputProps={inputProps}
      />
      {renderInfoWithoutHints}
    </FormWrapper>
  );
};

export default AutocompleteInput;
