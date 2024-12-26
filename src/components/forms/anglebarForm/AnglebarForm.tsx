'use client'
import ValidationErrorMessage from "@/components/validationErrorMessage/ValidationErrorMessage"
//styles import
import styles from "./anglebarForm.module.css"

import { steelGrades } from '@/lib/data'
import { convertDotToComa, createStringWithSingleWhiteSpaces, removeZeroCharFromNum } from '@/lib/utils'
import React, { ReactNode, useEffect, useState } from 'react'
import { CiLock } from 'react-icons/ci'
import { FaUndo } from 'react-icons/fa'
import { FaRegCopy, FaTrashCan } from 'react-icons/fa6'
import Tooltip from "@/components/tooltip/Tooltip"

type AnglebarFormData = {
  name: string;
  dimensionA: number;
  dimensionB: number;
  thickness: number;
  gradeEU: string;
  gradeGer: string;
  additional: string;
}

const AnglebarForm = ({materialGradesArr} : {materialGradesArr: ReactNode[]}) => {
  const gradeOptionsArr = steelGrades.map((grade) => {
    return (
      <option key={grade.EuNorm + grade.GerNorm} value={grade.EuNorm}>{grade.EuNorm}</option>
    )
  })

  const initialFormData = {
    name: "Kątownik",
    dimensionA: 0,
    dimensionB: 0,
    thickness: 0,
    gradeEU: "",
    gradeGer: "",
    additional: "",
  }

  // state variables
  const [formData, setFormData] = useState<AnglebarFormData>(initialFormData);
  const [savedFormData, setSavedFormData] = useState<AnglebarFormData>(initialFormData)
  const [isUndoOn, setIsUndoOn] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState<string>("");
  const [indexName, setIndexName] = useState("");
  const [isShowTooltip, setIsShowTooltip] = useState(false);

  useEffect(() => {
    const newIndexName = `${formData.name.toUpperCase()} ${convertDotToComa(removeZeroCharFromNum(formData.dimensionA))} x ${convertDotToComa(removeZeroCharFromNum(formData.dimensionB))} x ${convertDotToComa(removeZeroCharFromNum(formData.thickness))} ${formData.gradeEU.toUpperCase()} ${formData.additional.toUpperCase()}`
    setIndexName(createStringWithSingleWhiteSpaces(newIndexName))
  }, [formData]);

  useEffect(() => {
    if (isShowTooltip) {
      setTimeout(() => {
        setIsShowTooltip(false);
      }, 1900);
    } 
  }, [isShowTooltip]);

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
      parseFloat(formData.dimensionA.toString()) === 0 ||
      !formData.dimensionA 
    ) {
      setFormErrorMessage('Wymiar A nie może być pusty lub równy 0')
      return
    }
    if (
      parseFloat(formData.dimensionA.toString()) < 0 
    ) {
      setFormErrorMessage('Wymiar A nie może być ujemny')
      return
    }
    if (
      parseFloat(formData.dimensionB.toString()) === 0 ||
      !formData.dimensionB 
    ) {
      setFormErrorMessage('Wymiar B nie może być pusty lub równy 0')
      return
    }
    if (
      parseFloat(formData.dimensionB.toString()) < 0
    ) {
      setFormErrorMessage('Wymiar B nie może być ujemny')
      return
    }
    if (
      parseFloat(formData.thickness.toString()) === 0 ||
      !formData.thickness 
    ) {
      setFormErrorMessage('Wymiar "grubość" nie może być pusty lub równy 0')
      return
    }
    if (
      parseFloat(formData.thickness.toString()) < 0
    ) {
      setFormErrorMessage('Wymiar "grubość" nie może być ujemny')
      return
    }
    if (
      formData.gradeEU === ""
    ) {
      setFormErrorMessage(`Wybierz gatunek materiału`)
      return
    }
    if (
      parseFloat(formData.thickness.toString()) >= parseFloat(formData.dimensionA.toString()) ||
      parseFloat(formData.thickness.toString()) >= parseFloat(formData.dimensionB.toString())
    ) {
      setFormErrorMessage(`Wymiar 'grubość' nie może być większa lub równy wymiarowi A lub B`)
      return
    }
    setIsShowTooltip(true);
    copyToClipboard(indexName);
  }

  const copyToClipboard = (indexName: string) => {
    navigator.clipboard.writeText(indexName)
  }

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
          <label htmlFor='dimensionB'>Wymiar B [mm]</label>
          <input
            type='number'
            name='dimensionB'
            onChange={handleChange}
            value={formData.dimensionB}
            min={0}
          />
        </ div>
        <div className={styles.formElement}>
          <label htmlFor='thickness'>Grubość [mm]</label>
          <input
            type='number'
            name='thickness'
            onChange={handleChange}
            value={formData.thickness}
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

export default AnglebarForm