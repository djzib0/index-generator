'use client'

import { cSectionTypes, steelGrades} from '@/lib/data'
import { convertDotToComa, createStringWithSingleWhiteSpaces, removeZeroCharFromNum } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { CiLock } from 'react-icons/ci'
import { FaUndo } from 'react-icons/fa'
import { FaRegCopy, FaTrashCan } from 'react-icons/fa6'
// styles import
import styles from "./cSectionForm.module.css"
import Image from 'next/image'

type CSectionFormData = {
  name: string;
  dimensionA: number;
  dimensionB: number;
  type: string;
  thickness: number;
  gradeClass: string;
  gradeEU: string;
  gradeGer: string;
  additional: string;
}

const CSectionForm = () => {
  
  const gradeOptionsArr = steelGrades.map((grade) => {
    return (
    <option key={grade.EuNorm + grade.GerNorm} value={grade.EuNorm}>{grade.EuNorm}</option>
    )
  })

  const cSectionTypesArr = cSectionTypes.map((type) => {
    return (
    <option key={type.type} value={type.type}>{type.type}</option>
    )
  })

  const initialFormData = {
    name: "Ceownik",
    dimensionA: 0,
    dimensionB: 0,
    type: "",
    thickness: 0,
    gradeClass: "",
    gradeEU: "",
    gradeGer: "",
    additional: "",
  }

  // state variables
  const [formData, setFormData] = useState<CSectionFormData>(initialFormData);
  const [savedFormData, setSavedFormData] = useState<CSectionFormData>(initialFormData)
  const [isUndoOn, setIsUndoOn] = useState(false);
  const [isDimensionB, setIsDimensionB] = useState(false);
  const [isType, setIsType] = useState(false);
  const [isThickness, setIsThickness] = useState(false);
  const [isFormValidationError, setIsFormValidationError] = useState<boolean>(true);
  const [formErrorMessage, setFormErrorMessage] = useState<string>("")
  const [indexName, setIndexName] = useState("")

  useEffect(() => {
    const newIndexName = `
    ${formData.name.toUpperCase()} ${isType ? formData.type : ""} ${convertDotToComa(removeZeroCharFromNum(formData.dimensionA))} ${isDimensionB ? `x ${convertDotToComa(removeZeroCharFromNum(formData.dimensionB))}`: ""} ${isThickness ? `x ${convertDotToComa(removeZeroCharFromNum(formData.thickness))}`: ""} ${formData.gradeEU.toUpperCase()} ${formData.additional.toUpperCase()}`;
    setIndexName(createStringWithSingleWhiteSpaces(newIndexName))
  }, [formData, isDimensionB, isType, isThickness])

  const toggleDimensionB = () => {
    setIsDimensionB(prevState => !prevState);
  }

  const toggleThickness = () => {
    setIsThickness(prevState => !prevState);
  }

  const toggleType = () => {
    setIsType(prevState => !prevState);
  }

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
    setSavedFormData(formData)
    setFormData(initialFormData);
    setIsUndoOn(true);
  }

  const undo = () => {
    setIsUndoOn(false);
    setFormData(savedFormData);
  }

  const checkForm = () => {
    setFormErrorMessage("")
    setIsFormValidationError(false);
    if (isType) {
      if (
        formData.type === ""
      ) {
        setIsFormValidationError(true);
        setFormErrorMessage(`Wybierz typ profilu`)
        return
      }
    }
    if (
      formData.dimensionA.toString() === "0" ||
      formData.dimensionA === 0 ||
      !formData.dimensionA 
    ) {
      setIsFormValidationError(true);
      setFormErrorMessage(`Wymiar A nie może być pusty lub równy 0`)
      return
    }
    if (isDimensionB) {
      if (
        formData.dimensionB.toString() === "0" || 
        formData.dimensionB === 0 || 
        !formData.dimensionB
      ) {
        setIsFormValidationError(true);
        setFormErrorMessage(`Wymiar B nie może być pusty lub równy 0`)
        return
      }
    }
    if (isThickness) {
      if (
        formData.thickness.toString() === "0" ||
        formData.thickness === 0 ||
        !formData.thickness
      ) {
        setIsFormValidationError(true);
        setFormErrorMessage(`Grubość nie może być pusta lub równa 0`)
        return
      }
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
      navigator.clipboard.writeText(indexName)
      setIsUndoOn(false)
    }
    if (!isFormValidationError) {
      copyToClipboard();
    }
  }, [isFormValidationError, indexName])
  
  return (
    <div className={styles.formContainer}>
      <div className={styles.menuContainer}>
        <div className={styles.btnContainer}>
          <p>Kliknij aby wyłączyć lub włączyć.</p>
          <div className={styles.btns}>
            <button 
              type="button" 
              className={`${styles.toggleBtn} ${isDimensionB ? styles.btnOn : styles.btnOff}`}
              onClick={toggleDimensionB}
              >
              Wymiar B
            </button>
            <button 
              type="button" 
              className={`${styles.toggleBtn} ${isThickness ? styles.btnOn : styles.btnOff}`}
              onClick={toggleThickness}
              >
              Grubość
            </button>
            <button 
              type="button" 
              className={`${styles.toggleBtn} ${isType ? styles.btnOn : styles.btnOff}`}
              onClick={toggleType}
              >
              Typ
            </button>
          </div>
        </div>
        <Image alt='cross section of c shape with dimensions' src={'/cshapedim.png'} width={150} height={150}/>
      </div>
      <form className={styles.form}>
        <div className={styles.formElement}>
          <label htmlFor='name'>Nazwa<span className={styles.lockIcon}><CiLock /></span></label>
          <input
            type='text'
            name='name'
            readOnly
            value={formData.name}
            disabled
          />
        </div>
        <div className={styles.formElement}>
          <label htmlFor="type">
            Typ
            {!isType && <span className={styles.lockIcon}><CiLock /></span>}
          </label>
          <select
            name='type'
            onChange={handleChange}
            value={formData.type}
            disabled={!isType}
          >
            <option value={""}>---</option>
            {cSectionTypesArr}
          </select>
        </div>
        <div className={styles.formElement}>
          <label htmlFor='dimensionA'>Wymiar A [mm]</label>
          <input
            type='number'
            name='dimensionA'
            onChange={handleChange}
            value={formData.dimensionA}
            min={0}
          />
        </ div>
        <div className={styles.formElement}>
          <label htmlFor='dimensionB'>
            Wymiar B [mm]
            {!isDimensionB && <span className={styles.lockIcon}><CiLock /></span>}
          </label>
          <input
            type='number'
            name='dimensionB'
            onChange={handleChange}
            value={formData.dimensionB}
            disabled={!isDimensionB}
            min={0}
          />
        </ div>
        <div className={styles.formElement}>
          <label htmlFor='thickness'>
            Grubość [mm]
            {!isThickness && <span className={styles.lockIcon}><CiLock /></span>}
          </label>
          <input
            type='number'
            name='thickness'
            onChange={handleChange}
            value={formData.thickness}
            disabled={!isThickness}
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
    </div>
  )
}

export default CSectionForm