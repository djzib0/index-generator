'use client'

import { steelGrades } from '@/lib/data';
import { createStringWithSingleWhiteSpaces, convertDotToComa, removeZeroCharFromNum } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import styles from "./pipeForm.module.css"
import { FaRegCopy, FaTrashCan } from 'react-icons/fa6';
import { CiLock } from 'react-icons/ci';
import { FaUndo } from 'react-icons/fa';
import ValidationErrorMessage from '@/components/validationErrorMessage/ValidationErrorMessage';
import Tooltip from '@/components/tooltip/Tooltip';

type PipeFormData = {
  name: string;
  diameter: number;
  wallThickness: number;
  gradeEU: string;
  gradeGer: string;
  additional: string;
}

const PipeForm = () => {
  const gradeOptionsArr = steelGrades.map((grade) => {
    return (
      <option key={grade.EuNorm + grade.GerNorm} value={grade.EuNorm}>{grade.EuNorm}</option>
    )
  })

  const initialFormData = {
    name: "Rura",
    diameter: 0,
    wallThickness: 0,
    gradeEU: "",
    gradeGer: "",
    additional: "",
  }

  // state variables
  const [formData, setFormData] = useState<PipeFormData>(initialFormData);
  const [savedFormData, setSavedFormData] = useState<PipeFormData>(initialFormData)
  const [isUndoOn, setIsUndoOn] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState<string>("");
  const [indexName, setIndexName] = useState("");
  const [isShowTooltip, setIsShowTooltip] = useState(false);

  useEffect(() => {
    const newIndexName = `${formData.name.toUpperCase()} FI ${convertDotToComa(removeZeroCharFromNum(formData.diameter))} x ${convertDotToComa(removeZeroCharFromNum(formData.wallThickness))} ${formData.gradeEU.toUpperCase()} ${formData.additional.toUpperCase()}`
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
      parseFloat(formData.diameter.toString()) === 0 ||
      !formData.diameter 
    ) {
      setFormErrorMessage(`Wymiar "średnica" nie może być pusty lub równy 0`)
      return
    }
    if (
      parseFloat(formData.diameter.toString()) < 0
    ) {
      setFormErrorMessage(`Wymiar "średnica" nie może być ujemny`)
      return
    }
    if (
      parseFloat(formData.wallThickness.toString()) === 0 || 
      !formData.wallThickness
    ) {
      setFormErrorMessage(`Wymiar "ścianka" nie może być pusty lub równy 0`)
      return
    }
    if (
      parseFloat(formData.wallThickness.toString()) < 0 
    ) {
      setFormErrorMessage(`Wymiar "ścianka" nie może być ujemny`)
      return
    }
    if (   
      parseFloat(formData.wallThickness.toString()) >= parseFloat(formData.diameter.toString())
    ) {
      setFormErrorMessage(`Wymiar "ścianka" nie może być większy lub równy wymiarowi "średnica"`)
      return
    }
    if (
      parseFloat(formData.wallThickness.toString()) * 2 >= parseFloat(formData.diameter.toString())
    ) {
      setFormErrorMessage(`Wymiar 'ścianka' jest za duży.`)
      return
    }
    if (
      formData.gradeEU === ""
    ) {
      setFormErrorMessage(`Wybierz gatunek materiału`)
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
          <label htmlFor='wallThickness'>Ścianka [mm]</label>
          <input
            type='number'
            name='wallThickness'
            onChange={handleChange}
            value={formData.wallThickness}
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

export default PipeForm