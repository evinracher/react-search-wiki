import { renderHook, act } from '@testing-library/react-hooks';
import moxios from 'moxios';

import { useSearchForm, useDebounce, useSearch } from '../hooks';

// import {} from 'moxios'

jest.useFakeTimers();

describe('useSearchForm hook', () => {
  let event1;
  let event2;

  beforeEach(() => {
    event1 = {
      target: {
        value: 'data1'
      }
    };

    event2 = {
      target: {
        value: 'data2'
      }
    };
  });

  it('should update search value', () => {
    const { result } = renderHook(() => useSearchForm());
    expect(result.current.searchValue).toBe('');

    act(() => result.current.onSearchChange(event1));
    expect(result.current.searchValue).toBe('data1');

    act(() => result.current.onSearchChange(event2));
    expect(result.current.searchValue).toBe('data2');
  });


});

describe('useDebounce hook', () => {
  it('should return the same value after long delay', () => {
    const expectedResult = "text";

    const { result } = renderHook(() => useDebounce(expectedResult, 500));

    expect(result.current).toBe(expectedResult);

    jest.advanceTimersByTime(510);

    expect(result.current).toBe(expectedResult);
  });

  it('should return the same value before timer is reached', () => {
    const value1 = 'text1';
    const value2 = 'text2';

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: value1, delay: 500 } }
    );

    expect(result.current).toBe(value1);

    jest.advanceTimersByTime(490);

    rerender({ value: value2 });

    expect(result.current).toBe(value1);

    jest.runAllTimers();

    expect(result.current).toBe(value2);
  });
});

describe('useSearch hook', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should return init data - empty articles', () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.articles).toEqual([]);
  });

  it('should return init data - IDLE status', () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.status).toBe('IDLE');
  });

  it('should have PENDING status when call is started', () => {
    const { result } = renderHook(() => useSearch('elon'));

    expect(result.current.status).toBe('PENDING');
  });

  it('should have SUCCESS status when call is executed', async () => {
    moxios.stubRequest('https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=fad&limit=10', {
      status: 200,
      response: ["fad", ["Fad", "Fad diet", "Faded (Alan Walker song)", "Fade (audio engineering)", "FADD", "Fading affect bias", "Fade to Grey (Visage song)", "Fade (Kanye West song)", "Fadeout (Arrow)", "Fad Gadget"], ["", "", "", "", "", "", "", "", "", ""], ["https://en.wikipedia.org/wiki/Fad", "https://en.wikipedia.org/wiki/Fad_diet", "https://en.wikipedia.org/wiki/Faded_(Alan_Walker_song)", "https://en.wikipedia.org/wiki/Fade_(audio_engineering)", "https://en.wikipedia.org/wiki/FADD", "https://en.wikipedia.org/wiki/Fading_affect_bias", "https://en.wikipedia.org/wiki/Fade_to_Grey_(Visage_song)", "https://en.wikipedia.org/wiki/Fade_(Kanye_West_song)", "https://en.wikipedia.org/wiki/Fadeout_(Arrow)", "https://en.wikipedia.org/wiki/Fad_Gadget"]]
    });
    const { result, waitForNextUpdate } = renderHook(() => useSearch('fad'));

    await waitForNextUpdate();

    expect(result.current.status).toBe('SUCCESS');
  });

  it('should return articles when call is executed', async () => {
    moxios.stubRequest('https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=fad&limit=10', {
      status: 200,
      response: ["fad", ["fad it"], [""], ["link"]]
    });
    const { result, waitForNextUpdate } = renderHook(() => useSearch('fad'));

    await waitForNextUpdate();

    expect(result.current.articles).toEqual([{id: "link", label:"fad it"}]);
  });

  it('should return status ERROR when request was fail', async () =>{
    moxios.stubRequest('https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=fad&limit=10', {
      status: 500,
      response: ["fad", ["Fad", "Fad diet", "Faded (Alan Walker song)", "Fade (audio engineering)", "FADD", "Fading affect bias", "Fade to Grey (Visage song)", "Fade (Kanye West song)", "Fadeout (Arrow)", "Fad Gadget"], ["", "", "", "", "", "", "", "", "", ""], ["https://en.wikipedia.org/wiki/Fad", "https://en.wikipedia.org/wiki/Fad_diet", "https://en.wikipedia.org/wiki/Faded_(Alan_Walker_song)", "https://en.wikipedia.org/wiki/Fade_(audio_engineering)", "https://en.wikipedia.org/wiki/FADD", "https://en.wikipedia.org/wiki/Fading_affect_bias", "https://en.wikipedia.org/wiki/Fade_to_Grey_(Visage_song)", "https://en.wikipedia.org/wiki/Fade_(Kanye_West_song)", "https://en.wikipedia.org/wiki/Fadeout_(Arrow)", "https://en.wikipedia.org/wiki/Fad_Gadget"]]
    });
    const { result, waitForNextUpdate } = renderHook(() => useSearch('fad'));

    await waitForNextUpdate();

    expect(result.current.status).toBe('ERROR');
  });
});