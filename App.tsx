import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';

import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useState } from 'react';
import './global.css';

const buttons = [
  ['√', 'π', '^', '!'],
  ['AC', '()', '%', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', ',', '⌫', '='],
];

export default function App() {
  const [expression, setExpression] = useState('');

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const handlePress = (value: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    if (value === 'AC') {
      setExpression('');
    } else if (value === '⌫') {
      setExpression(expression.slice(0, -1));
    } else if (value === '=') {
      try {
        let expr = expression
          .replace(/π/g, Math.PI.toString())
          .replace(/√(\d+(\.\d+)?)/g, (_, num) => `Math.sqrt(${num})`)
          .replace(/(\d+)!/g, (_, num) => factorial(parseInt(num)).toString())
          .replace(/(\d+)\^(\d+)/g, (_, base, exp) => `Math.pow(${base},${exp})`)
          .replace(/,/g, '.')
          .replace(/%/g, '/100');

        const result = eval(expr);
        setExpression(result.toString());
      } catch (e) {
        setExpression('Erro');
      }
    } else {
      setExpression(expression + value);
    }
  };

  return (
    <SafeAreaView className="bg-[#0F141A] flex h-full justify-end p-4">
      <View className="mb-12 bg-cyan-900 h-44 rounded-xl flex items-end justify-end">
        <Text className="text-right text-7xl text-white">{expression || '0'}</Text>
      </View>

      {buttons.map((row, i) => (
        <View key={i} className="flex-row justify-between mb-2">
          {row.map((btn, j) => {
            return (
              <TouchableOpacity
                key={j}
                className={`
                  w-[80px] h-20 bg-[#004C6C] rounded-xl justify-center items-center
                  ${btn === '√' ? 'h-14 !text-lg opacity-50' : ''}  
                  ${btn === 'π' ? 'h-14 !text-lg opacity-50' : ''}  
                  ${btn === '^' ? 'h-14 !text-lg opacity-50' : ''}  
                  ${btn === '!' ? 'h-14 !text-lg opacity-50' : ''} 
                `}
                onPress={() => handlePress(btn)}
              >
                <Text className="text-white text-4xl">{btn}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      <StatusBar style="light" />
    </SafeAreaView>
  );
}
