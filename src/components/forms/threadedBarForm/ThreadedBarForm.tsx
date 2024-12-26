'use client'

import { gradeClasses, steelGrades } from '@/lib/data'
import { convertDotToComa, createStringWithSingleWhiteSpaces, removeZeroCharFromNum } from '@/lib/utils';
import React, { ReactNode, useEffect, useState } from 'react';
import styles from "./threadedBarForm.module.css"
import { CiLock } from 'react-icons/ci';
import { FaRegCopy, FaTrashCan } from 'react-icons/fa6';
import { FaUndo } from 'react-icons/fa';
import ValidationErrorMessage from '@/components/validationErrorMessage/ValidationErrorMessage';
import Tooltip from '@/components/tooltip/Tooltip';


type ThreadedBarFormData = {
  name: string;
  thread: number;
  length?: number;
  din?: string;
  gradeClass?: string;
  gradeEU: string;
  gradeGer: string;
  additional: string;
}

const ThreadedBarForm = ({materialGradesArr, materialClassesArr} : {materialGradesArr: ReactNode[], materialClassesArr: ReactNode[]}) => {
  
  const gradeOptionsArr = steelGrades.map((grade) => {
    return (
    <option key={grade.EuNorm + grade.GerNorm} value={grade.EuNorm}>{grade.EuNorm}</option>
    )
  })

  const gradeClassesArr = gradeClasses.map((gradeClass) => {
    return (
    <option key={gradeClass.gradeClass} value={gradeClass.gradeClass}>{gradeClass.gradeClass}</option>
    )
  })

  const initialFormData = {
    name: "Pręt gwint.",
    thread: 0,
    length: 0,
    din: "",
    gradeClass: "",
    gradeEU: "",
    gradeGer: "",
    additional: "",
  }

  // state variables
  const [formData, setFormData] = useState<ThreadedBarFormData>(initialFormData);
  const [savedFormData, setSavedFormData] = useState<ThreadedBarFormData>(initialFormData)
  const [isUndoOn, setIsUndoOn] = useState(false);
  const [isLengthOn, setIsLengthOn] = useState(false);
  const [isDinOn, setIsDinOn] = useState(false);
  const [isGradeClassOn, setIsGradeClassOn] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState<string>("");
  const [indexName, setIndexName] = useState("");
  const [isShowTooltip, setIsShowTooltip] = useState(false);

  useEffect(() => {
    const newIndexName = `
    ${formData.name.toUpperCase()} M ${formData.thread} 
    ${isLengthOn && formData.length ? `x ${convertDotToComa(removeZeroCharFromNum(formData.length))}`: ""}
    ${isDinOn ? `DIN ${formData.din}`: ""}
    ${isGradeClassOn ? `KL. ${formData.gradeClass}`: ""}
    ${formData.gradeEU.toUpperCase()} 
    ${formData.additional.toUpperCase()}
    `;
    setIndexName(createStringWithSingleWhiteSpaces(newIndexName))
  }, [formData, isLengthOn, isDinOn, isGradeClassOn]);

  useEffect(() => {
    if (isShowTooltip) {
      setTimeout(() => {
        setIsShowTooltip(false);
      }, 1900);
    } 
  }, [isShowTooltip]);

  const toggleLength = () => {
    setIsLengthOn(prevState => !prevState);
  }

  const toggleDin = () => {
    setIsDinOn(prevState => !prevState);
  }

  const toggleGradeClass = () => {
    setIsGradeClassOn(prevState => !prevState)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    navigator.clipboard.writeText("")
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
    if (
      parseFloat(formData.thread.toString()) === 0 ||
      !formData.thread 
    ) {
      setFormErrorMessage(`Rozmiar gwintu nie może być pusty lub równy 0`)
      return
    }
    if (
      parseFloat(formData.thread.toString()) < 0
    ) {
      setFormErrorMessage(`Rozmiar gwintu nie może być ujemny`)
      return
    }
    if (isLengthOn) {
        if ( 
          (formData.length &&  parseFloat(formData.length.toString())) === 0 || 
          !formData.length
        ) {
          setFormErrorMessage(`Wymiar "długość" nie może być pusty lub równy 0`)
          return
        }
        if ( 
          (formData.length &&  parseFloat(formData.length.toString())) < 0 
        ) {
          setFormErrorMessage(`Wymiar "długość" nie może być ujemny`)
          return
        }
    }
    if (isDinOn) {
        if ( 
          !formData.din
        ) {
          setFormErrorMessage(`Pole "DIN" nie może być puste`)
          return
        }
    }
    if (
      formData.gradeEU === ""
    ) {
      setFormErrorMessage(`Wybierz gatunek materiału`)
      return
    }
    if (isGradeClassOn) {
      if (
        formData.gradeClass === "" 
      ) {
        setFormErrorMessage(`Wybierz lub wyłącz klasę`)
        return
      }
    }
    setIsShowTooltip(true);
    copyToClipboard(indexName);
  }

  const copyToClipboard = (indexName: string) => {
    navigator.clipboard.writeText(indexName)
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.btnContainer}>
        <p>Kliknij aby wyłączyć lub włączyć.</p>
        <div className={styles.btns}>
          <button 
            type="button" 
            className={`${styles.toggleBtn} ${isLengthOn ? styles.btnOn : styles.btnOff}`}
            onClick={toggleLength}
            >
            Długość
          </button>
          <button 
            type="button" 
            className={`${styles.toggleBtn} ${isDinOn ? styles.btnOn : styles.btnOff}`}
            onClick={toggleDin}
            >
            DIN
          </button>
          <button 
            type="button" 
            className={`${styles.toggleBtn} ${isGradeClassOn ? styles.btnOn : styles.btnOff}`}
            onClick={toggleGradeClass}
            >
            Klasa
          </button>
        </div>
      </div>
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
          <label htmlFor='thread'>Gwint</label>
          <input
            type='number'
            name='thread'
            onChange={handleChange}
            value={formData.thread}
            min={0}
          />
        </ div>
        <div className={styles.formElement}>
          <label htmlFor='length'>
            Długość [mm]
            {!isLengthOn && <span className={styles.lockIcon}><CiLock /></span>}
          </label>
          <input
            type='number'
            name='length'
            onChange={handleChange}
            value={formData.length}
            disabled={!isLengthOn}
            min={0}
          />
        </ div>
        <div className={styles.formElement}>
          <label htmlFor='din'>
            DIN
            {!isDinOn && <span className={styles.lockIcon}><CiLock /></span>}
          </label>
          <input
            type='text'
            name='din'
            onChange={handleChange}
            value={formData.din}
            disabled={!isDinOn}
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
            {materialGradesArr ? materialGradesArr : gradeOptionsArr}
          </select>
        </div>
        <div className={styles.formElement}>
          <label htmlFor="gradeClass">
            Klasa
            {!isGradeClassOn && <span className={styles.lockIcon}><CiLock /></span>}
          </label>
          <select
            name='gradeClass'
            onChange={handleChange}
            value={formData.gradeClass}
            disabled={!isGradeClassOn}
          >
            <option value={""}>---</option>
            {materialClassesArr ? materialClassesArr : gradeClassesArr}
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
          onClick={() => checkForm()}
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
      {formErrorMessage && <ValidationErrorMessage message={formErrorMessage} />}
      {isShowTooltip && <Tooltip message={"Skopiowano do schowka!"} />}
    </div>
  )
}

export default ThreadedBarForm