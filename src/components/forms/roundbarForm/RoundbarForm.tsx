'use client'

import { steelGrades } from '@/lib/data';
// styles import
import styles from "./roundbarForm.module.css";
import { useEffect, useState } from 'react';
import { convertDotToComa, createStringWithSingleWhiteSpaces, removeZeroCharFromNum } from '@/lib/utils';
import { CiLock } from 'react-icons/ci';
import { FaRegCopy, FaTrashCan } from 'react-icons/fa6';
import { FaUndo } from 'react-icons/fa';
import ValidationErrorMessage from '@/components/validationErrorMessage/ValidationErrorMessage';

type RoundbarFormData = {
  name: string;
  diameter: number;
  gradeEU: string;
  gradeGer: string;
  additional: string;
}

const RoundbarForm = () => {
  const gradeOptionsArr = steelGrades.map((grade) => {
    return (
      <option key={grade.EuNorm + grade.GerNorm} value={grade.EuNorm}>{grade.EuNorm}</option>
    )
  })

  const initialFormData = {
    name: "Pręt",
    diameter: 0,
    gradeEU: "",
    gradeGer: "",
    additional: "",
  }

  // state variables
  const [formData, setFormData] = useState<RoundbarFormData>(initialFormData);
  const [savedFormData, setSavedFormData] = useState<RoundbarFormData>(initialFormData)
  const [isUndoOn, setIsUndoOn] = useState(false);
  const [isFormValidationError, setIsFormValidationError] = useState<boolean>(true);
  const [formErrorMessage, setFormErrorMessage] = useState<string>("")
  const [indexName, setIndexName] = useState("")

  useEffect(() => {
    const newIndexName = `${formData.name.toUpperCase()} FI ${convertDotToComa(removeZeroCharFromNum(formData.diameter))} ${formData.gradeEU.toUpperCase()} ${formData.additional.toUpperCase()}`
    setIndexName(createStringWithSingleWhiteSpaces(newIndexName))
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormErrorMessage("")
    setIsUndoOn(false);
    const {name, value, type} = e.target
    if ("checked" in e.target) {
      const checked = e.target.checked
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          [name]: type === "checkbox" ? checked: value
        }
      })
    }
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  const clearForm = () => {
    setFormData(initialFormData);
    setSavedFormData(formData)
    setIsUndoOn(true);
  }

  const undo = () => {
    setIsUndoOn(false);
    setFormData(savedFormData);
  }

  const checkForm = () => {
    setFormErrorMessage("")
    setIsFormValidationError(false);
    if (
      formData.diameter.toString() === "0" || 
      formData.diameter === 0 ||
      !formData.diameter 
    ) {
      setIsFormValidationError(true);
      setFormErrorMessage("Średnica nie może być pusta lub równa 0")
      return
    }
    if (
      formData.gradeEU === ""
    ) {
      setIsFormValidationError(true);
      setFormErrorMessage(`Wybierz gatunek materiału`)
      return
    }
  }

  const handleCopy = () => {
    // reset clipboard
    navigator.clipboard.writeText("")
    checkForm();
  }

  useEffect(() => {
    const copyToClipboard = () => {
      // remove form error message
      navigator.clipboard.writeText(indexName)
      setIsUndoOn(false)
    }
    if (!isFormValidationError) {
      copyToClipboard();
    }
  }, [isFormValidationError, indexName])

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <div className={styles.formElement}>
          <label htmlFor='name'>Nazwa<span className={styles.lockIcon}><CiLock /></span></label>
          <input
            type='text'
            name='name'
            // onChange={handleChange}
            readOnly
            value={formData.name}
            disabled
          />
        </div>
        <div className={styles.formElement}>
          <label htmlFor='diameter'>Średnica [mm]</label>
          <input
            type='number'
            name='diameter'
            onChange={handleChange}
            value={formData.diameter}
            min={0}
          />
        </ div>
        <div className={styles.formElement}>
          <label htmlFor="gradeEU">Gatunek</label>
          <select
            name='gradeEU'
            onChange={handleChange}
            value={formData.gradeEU}
          >
            <option value={""}>---</option>
            {gradeOptionsArr}
          </select>
        </div>
        <div className={styles.formElement}>
          <label htmlFor='additional'>Dodatkowy opis</label>
          <input
            type='text'
            name='additional'
            onChange={handleChange}
            value={formData.additional}
          />
        </div>
      </form>
      <div className={"resultIndexContainer"}>
        <p className={"resultIndexToCopy"}>{indexName}</p>
        <button 
          onClick={handleCopy}
          className={"resultIndexCopyBtn"}
        >
          <FaRegCopy />
        </button>
        {!isUndoOn && <button 
          onClick={clearForm}
          className={"resultIndexCopyBtn"}
        >
          <FaTrashCan />
        </button>}
        {isUndoOn && <button 
          onClick={undo}
          className={"resultIndexCopyBtn"}
        >
          <FaUndo />
        </button>}
      </div>
      {formErrorMessage && 
        <div className={styles.errorMessageContainer}>
          {formErrorMessage}
        </div>
      }
      {formErrorMessage && <ValidationErrorMessage message={formErrorMessage} />}
    </div>
  )
}

export default RoundbarForm