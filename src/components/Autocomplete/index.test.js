import React from 'react';
import Autocomplete from '.';
import { shallow } from 'enzyme';

const render = (props) => shallow(<Autocomplete {...props} />);

describe('Autocomplete component', () => {
  let sut;
  let props;

  describe('without props', () => {
    beforeEach(() => {
      sut = render(props);
    });

    it('should match snapshot', () => {
      expect(sut).toMatchSnapshot();
    });
  });

  describe('when articles are passed', () => {
    beforeEach(() => {
      props = {
        articles: [],
        searchValue: 'search value',
        onSearchChange: jest.fn()
      };

      sut = render(props);
    });

    it('should match renderMenu snapshot', () => {
      const props = sut.props();

      expect(props.renderMenu()).toMatchSnapshot();
    });
  });

  describe('when articles are not passed', () => {
    beforeEach(() => {
      props = {
        articles: null,
        searchValue: 'search value',
        onSearchChange: jest.fn()
      };

      sut = render(props);
    });

    it('should match renderMenu snapshot', () => {
      const props = sut.props();

      expect(props.renderMenu()).toMatchSnapshot();
    });
  });

  describe('when renderItem props is called', () => {
    beforeEach(() => {

      sut = render(props);
    });

    describe('when item is highlighted', () => {
      it('should match renderItem snapshot', () => {
        const { renderItem } = sut.props();
        const item = {
          id: 1,
          label: 'Test'
        };

        expect(renderItem(item, true)).toMatchSnapshot();
      });
    });

    describe('when item is not highlighted', () => {
      it('should match renderItem snapshot', () => {
        const { renderItem } = sut.props();
        const item = {
          id: 1,
          label: 'Test'
        };

        expect(renderItem(item, false)).toMatchSnapshot();
      });
    });

  });

  describe('when getItemValue is called', () => {
    beforeEach(() => {
      sut = render(props);
    });

    it('should return label', () => {
      const { getItemValue } = sut.props();

      expect(getItemValue({label: 'test'})).toBe('test');
    });
  });
});