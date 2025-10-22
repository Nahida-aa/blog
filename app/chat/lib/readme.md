这个 

sanitizeUIMessages

 函数的主要目的是对一组消息进行清理和过滤，以确保消息中的工具调用（tool invocations）状态和内容的有效性。具体来说，它会：

1. 遍历每条消息，检查消息的角色是否为 `assistant`。
2. 如果消息中包含工具调用（tool invocations），则进一步处理这些工具调用。
3. 收集所有状态为 `result` 的工具调用的 

toolCallId

。
4. 过滤工具调用，只保留状态为 `result` 的工具调用，或者 

toolCallId

 在收集的 

toolResultIds

 列表中的工具调用。
5. 返回经过清理和过滤的消息列表，只保留那些有内容或包含工具调用的消息。

### 详细解释

#### 函数签名

```typescript
export function sanitizeUIMessages(messages: Array<Message>): Array<Message>
```

- **参数**：接受一个 

Message

 类型的数组。
- **返回值**：返回一个 

Message

 类型的数组。

#### 主要步骤

1. **遍历消息**：

```typescript
const messagesBySanitizedToolInvocations = messages.map((message) => {
  if (message.role !== 'assistant') return message;

  if (!message.toolInvocations) return message;
```

- 遍历每条消息，首先检查消息的角色是否为 `assistant`。
- 如果消息中不包含工具调用（tool invocations），则直接返回消息。

2. **收集工具调用结果的 

toolCallId

**：

```typescript
const toolResultIds: Array<string> = [];

for (const toolInvocation of message.toolInvocations) {
  if (toolInvocation.state === 'result') {
    toolResultIds.push(toolInvocation.toolCallId);
  }
}
```

- 初始化一个空数组 

toolResultIds

。
- 遍历消息中的工具调用，收集所有状态为 `result` 的工具调用的 

toolCallId

。

3. **过滤工具调用**：

```typescript
const sanitizedToolInvocations = message.toolInvocations.filter(
  (toolInvocation) =>
    toolInvocation.state === 'result' ||
    toolResultIds.includes(toolInvocation.toolCallId),
);
```

- 过滤工具调用，只保留状态为 `result` 的工具调用，或者 

toolCallId

 在收集的 

toolResultIds

 列表中的工具调用。

4. **返回清理后的消息**：

```typescript
return {
  ...message,
  toolInvocations: sanitizedToolInvocations,
};
```

- 返回一个新的消息对象，包含清理后的工具调用。

5. **过滤最终的消息列表**：

```typescript
return messagesBySanitizedToolInvocations.filter(
  (message) =>
    message.content.length > 0 ||
    (message.toolInvocations && message.toolInvocations.length > 0),
);
```

- 过滤最终的消息列表，只保留那些有内容或包含工具调用的消息。

### 示例

假设有以下消息列表：

```typescript
const messages = [
  {
    role: 'assistant',
    content: '',
    toolInvocations: [
      { toolCallId: '1', state: 'result' },
      { toolCallId: '2', state: 'pending' },
    ],
  },
  {
    role: 'user',
    content: 'Hello',
    toolInvocations: [],
  },
];
```

调用 

sanitizeUIMessages

 函数后，返回的消息列表将只包含状态为 `result` 的工具调用，并且过滤掉没有内容和工具调用的消息。

```typescript
const sanitizedMessages = sanitizeUIMessages(messages);
console.log(sanitizedMessages);
```

输出：

```typescript
[
  {
    role: 'assistant',
    content: '',
    toolInvocations: [
      { toolCallId: '1', state: 'result' },
    ],
  },
  {
    role: 'user',
    content: 'Hello',
    toolInvocations: [],
  },
]
```

### 结论



sanitizeUIMessages

 函数用于清理和过滤消息列表，确保消息中的工具调用状态和内容的有效性。通过遍历消息、收集工具调用结果、过滤工具调用和最终过滤消息列表，该函数返回一个经过清理和过滤的消息列表。如果你有任何问题或需要进一步的帮助，请随时告诉我。