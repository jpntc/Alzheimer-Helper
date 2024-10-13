import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

export default function DashboarScreen({ navigation }) {
  
  const questions = [
    {
      question: 'Do you frequently forget recent conversations or events?',
      answers: [
        { text: 'Never', score: 0 },
        { text: 'Rarely', score: 1 },
        { text: 'Sometimes', score: 2 },
        { text: 'Often', score: 3 },
      ],
    },
    {
      question: 'Do you struggle to find the right words or names?',
      answers: [
        { text: 'Never', score: 0 },
        { text: 'Rarely', score: 1 },
        { text: 'Sometimes', score: 2 },
        { text: 'Often', score: 3 },
      ],
    },
    {
      question: 'Do you experience difficulty concentrating?',
      answers: [
        { text: 'Never', score: 0 },
        { text: 'Rarely', score: 1 },
        { text: 'Sometimes', score: 2 },
        { text: 'Often', score: 3 },
      ],
    },
    {
      question: 'Do you often lose track of time or forget appointments?',
      answers: [
        { text: 'Never', score: 0 },
        { text: 'Rarely', score: 1 },
        { text: 'Sometimes', score: 2 },
        { text: 'Often', score: 3 },
      ],
    },
    {
      question: 'Do you have difficulty navigating familiar places?',
      answers: [
        { text: 'Never', score: 0 },
        { text: 'Rarely', score: 1 },
        { text: 'Sometimes', score: 2 },
        { text: 'Often', score: 3 },
      ],
    },
    {
      question: 'Do you struggle with decision-making or problem-solving?',
      answers: [
        { text: 'Never', score: 0 },
        { text: 'Rarely', score: 1 },
        { text: 'Sometimes', score: 2 },
        { text: 'Often', score: 3 },
      ],
    },
    {
      question: 'Do you frequently misplace objects like keys or wallets?',
      answers: [
        { text: 'Never', score: 0 },
        { text: 'Rarely', score: 1 },
        { text: 'Sometimes', score: 2 },
        { text: 'Often', score: 3 },
      ],
    },
    {
      question: 'Do you feel confused about the day, date, or time?',
      answers: [
        { text: 'Never', score: 0 },
        { text: 'Rarely', score: 1 },
        { text: 'Sometimes', score: 2 },
        { text: 'Often', score: 3 },
      ],
    },
    {
      question: 'Do you have trouble understanding visual images or spatial relationships?',
      answers: [
        { text: 'Never', score: 0 },
        { text: 'Rarely', score: 1 },
        { text: 'Sometimes', score: 2 },
        { text: 'Often', score: 3 },
      ],
    },
    {
      question: 'Do you often repeat questions or statements?',
      answers: [
        { text: 'Never', score: 0 },
        { text: 'Rarely', score: 1 },
        { text: 'Sometimes', score: 2 },
        { text: 'Often', score: 3 },
      ],
    },
  ];

  // State to track the current question, total score, and whether the quiz is completed
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Function to handle answer selection
  const handleAnswer = (score) => {
    setTotalScore(totalScore + score);

    // If it's the last question, complete the quiz
    if (currentQuestionIndex === questions.length - 1) {
      setIsQuizCompleted(true);
    } else {
      // Move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Function to determine category based on score
  const getCategory = () => {
    if (totalScore <= 5) {
      return 'Low risk of Alzheimer\'s';
    } else if (totalScore <= 15) {
      return 'Moderate risk of Alzheimer\'s';
    } else {
      return 'High risk of Alzheimer\'s';
    }
  };

  return (
    <View style={styles.container}>
      {!isQuizCompleted ? (
        <View>
          <Text style={styles.question}>
            {questions[currentQuestionIndex].question}
          </Text>

          {questions[currentQuestionIndex].answers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={styles.answerButton}
              onPress={() => handleAnswer(answer.score)}
            >
              <Text style={styles.answerText}>{answer.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View>
          <Text style={styles.resultText}>Your total score: {totalScore}</Text>
          <Text style={styles.resultText}>Category: {getCategory()}</Text>
          <Button
            title="Start"
            onPress={() => {
              navigation.navigate('Home')
            }}
          />
          
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  answerButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  answerText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});
