import React, { useState } from 'react';
import { Card, Row } from 'react-bootstrap';
import Answer from './Answer';
import Tag from './Tag';
import '../../css/questions/question.css';
import { BiTrashAlt } from 'react-icons/bi';
import { AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import defaultImage from '../../assets/download.png';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {
  deleteQuestion,
  getQuestionByPage
} from '../../store/slices/questions.slice';

const Question = (props: { question: any; currentPage: any }) => {
  const [isExpand, setIsExpand] = useState(false);
  const [isShowImage, setIsShowImage] = useState(false);

  const toggleAnswers = () => {
    setIsExpand((prevState) => {
      return !prevState;
    });
  };

  const dispatch = useDispatch();

  const toggleImage = () => {
    setIsShowImage((prevState) => {
      return !prevState;
    });
  };

  const onClickdeleteQuestion = async (id: any) => {
    await dispatch(deleteQuestion(id));
    await dispatch(getQuestionByPage(props.currentPage));
  };

  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://quizzo-service.herokuapp.com/uploads/image/'
      : 'http://localhost:5000/uploads/image/';

  return (
    <Card className="question">
      <Card.Body className="content">
        {/* expand icon */}
        <span className="clickable" onClick={toggleAnswers}>
          {isExpand ? (
            <MdKeyboardArrowDown className="icon ml-0 mt-3px" />
          ) : (
            <MdKeyboardArrowRight className="icon ml-0 mt-3px" />
          )}
        </span>

        <div className="question-section">
          {/* question title */}
          <blockquote className="blockquote">
            <div className="clickable" onClick={toggleAnswers}>
              <span>{props.question.title}</span>
            </div>
          </blockquote>

          {/* tags */}
          <div>
            {/* "?" in tags to check if exist tags then render */}
            {props.question.tags?.map((tag: any) => (
              <Tag tag={tag} key={tag.id} />
            ))}
          </div>
          {/* expand answer */}
          <div className="answers-content">
            {isExpand && (
              <Row className="mt-4 mb -4 mr-0 ml-0 flex-grow-1">
                {props.question.answers.map((answer: any, index: number) => (
                  <Answer answer={answer} key={answer.id} index={index} />
                ))}
              </Row>
            )}
          </div>
          <div
            className="smaller-font mt-4 clickable link"
            onClick={toggleImage}
          >
            Preview image
          </div>

          {/* image */}
          {isShowImage && (
            <div className="img" style={{ backgroundColor: '#AAA' }}>
              <img
                src={
                  props.question.image !== ''
                    ? baseUrl + props.question.image
                    : defaultImage
                }
                alt=""
                width="200"
                height="200"
              />
            </div>
          )}
        </div>

        {/* icon & date section */}
        <div className="right-section">
          <div className="icon-section">
            <span className="clickable">
              <BiTrashAlt
                onClick={() => onClickdeleteQuestion(props.question.id)}
                className="icon"
                fill="#ED4867"
              />
            </span>
          </div>

          <div className="smaller-font date">
            {moment(props.question.updatedAt).format('DD-MM-YYYY HH:mm:ss')}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Question;
