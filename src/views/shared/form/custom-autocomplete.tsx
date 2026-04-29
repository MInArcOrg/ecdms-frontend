import React, { useEffect, useMemo, useState } from 'react';
import { CircularProgress, FormHelperText, InputLabel, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useField, useFormikContext } from 'formik';
import { debounce } from 'lodash';
import type { GetRequestParam } from 'src/types/requests';

export interface DefaultOptionType {
  label: string;
  value: string;
}

interface CustomAutocompleteProps<T = DefaultOptionType> {
  label: string;
  placeholder?: string;
  options?: T[];
  labelField?: string;
  disabled?: boolean;
  name: string;
  fetchOptions?: (params: GetRequestParam) => Promise<any>;
  getOptionLabel?: (option: T) => string;
  renderOption?: (props: React.HTMLAttributes<HTMLLIElement>, option: T) => React.ReactNode;
  valueProp?: keyof T;
  initialOption?: T;
  minSearchLength?: number;
  multiple?: boolean;
  [key: string]: any;
}

const CustomAutocomplete = <T,>({
  label,
  placeholder,
  options: staticOptions = [],
  labelField = 'label',
  disabled = false,
  name,
  fetchOptions,
  getOptionLabel,
  renderOption,
  valueProp,
  initialOption,
  minSearchLength = 2,
  multiple = false,
  ...props
}: CustomAutocompleteProps<T>) => {
  const [field, meta, helpers] = useField(name);
  const { isSubmitting } = useFormikContext();
  const hasError = Boolean(meta.touched && meta.error);

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly T[]>(staticOptions || []);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [internalSelectedOption, setInternalSelectedOption] = useState<T | null>(initialOption || null);

  useEffect(() => {
    if (!fetchOptions) {
      setOptions(staticOptions || []);
    }
  }, [fetchOptions, staticOptions]);

  const computeValue = () => {
    const formValue = field.value;

    if (multiple) {
      return formValue || [];
    }

    if (valueProp) {
      if (internalSelectedOption && (internalSelectedOption as any)[valueProp] === formValue) {
        return internalSelectedOption;
      }

      const found = (options as T[]).find((opt) => (opt as any)[valueProp] === formValue);
      if (found) return found;

      if (initialOption && (initialOption as any)[valueProp] === formValue) {
        return initialOption;
      }

      return null;
    }

    return formValue || null;
  };

  const currentValue = computeValue();

  const fetch = useMemo(
    () =>
      debounce(async (input: string) => {
        if (!fetchOptions) return;
        setLoading(true);
        try {
          const response = await fetchOptions({ search: input });

          const extractOptions = (res: any): T[] => {
            if (Array.isArray(res)) return res;
            if (res?.data && Array.isArray(res.data)) return res.data;
            if (res?.payload && Array.isArray(res.payload)) return res.payload;
            if (res?.payload?.data && Array.isArray(res.payload.data)) return res.payload.data;
            return [];
          };

          const results = extractOptions(response);
          setOptions(results);
        } finally {
          setLoading(false);
        }
      }, 500),
    [fetchOptions]
  );

  useEffect(() => {
    if (!fetchOptions) return;

    if (inputValue.length >= minSearchLength) {
      fetch(inputValue);
    } else {
      setOptions(initialOption ? ([initialOption] as T[]) : []);
    }

    return () => {
      fetch.cancel();
    };
  }, [fetchOptions, inputValue, fetch, minSearchLength, initialOption]);

  const resolvedGetOptionLabel = (option: T) => {
    if (getOptionLabel) return getOptionLabel(option);
    return (option as any)?.[labelField] || '';
  };

  return (
    <div>
      <InputLabel shrink>{label}</InputLabel>
      <Autocomplete
        fullWidth
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        multiple={multiple}
        value={currentValue}
        options={options}
        loading={loading}
        getOptionLabel={resolvedGetOptionLabel}
        renderOption={renderOption as any}
        filterOptions={(x) => x}
        isOptionEqualToValue={(option, value) => {
          if ((option as any)?.id && (value as any)?.id) {
            return (option as any).id === (value as any).id;
          }
          return option === value;
        }}
        inputValue={inputValue}
        onInputChange={(_, newInputValue, reason) => {
          if (!fetchOptions) return;
          if (reason === 'input') setInputValue(newInputValue);
          if (reason === 'clear') setInputValue('');
          if (reason === 'reset') {
            if (multiple) setInputValue('');
            else setInputValue(newInputValue || '');
          }
        }}
        onChange={(event, newValue) => {
          if (!multiple && newValue && !Array.isArray(newValue)) {
            setInternalSelectedOption(newValue as T);
          } else if (!multiple && !newValue) {
            setInternalSelectedOption(null);
          }

          if (valueProp && !multiple && newValue && !Array.isArray(newValue)) {
            helpers.setValue((newValue as any)[valueProp]);
          } else if (valueProp && !multiple && !newValue) {
            helpers.setValue(null);
          } else {
            helpers.setValue(newValue);
          }
        }}
        disabled={disabled || isSubmitting}
        noOptionsText={
          fetchOptions && inputValue.length < minSearchLength ? 'Type to search...' : undefined
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            error={hasError}
            helperText={hasError ? (meta.error as string) : ''}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        )}
        {...props}
      />
      {meta.touched && meta.error && <FormHelperText error>{meta.error}</FormHelperText>}
    </div>
  );
};

export default CustomAutocomplete;
