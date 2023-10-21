# NestJS Restful Boilerplate

<strong> 시작하는 서비스를 위한 NestJS Boilerplate </strong>

본 Boilerplate는 서비스의 `시작`에 초점을 맞추었습니다. 많은 서비스가 사용자 가치를 수호하며, 빠르게 성장하길 기원합니다.

[템플릿 사용하기](https://github.com/nextunicorn-inc/nestjs-starter/generate)

---

## Philosophy

### 정직하게. 
필요 이상의 기교를 쓰지 않도록 노력합니다. 
### 간결하게. 
시작하는 서비스가 빠르게 기능을 추가 할 수 있도록, 간결한 코드를 지향합니다. 도를 넘은 추상화는 지양합니다.
### 현실적으로. 
여러 이상적인 디자인패턴보다는 문제를 해결하기 가장 적당한 디자인 패턴을 지향합니다.
### 유연하게. 
항상 코드가 발전할 수 있음을 인지하고 개발합니다.

---

## Features

### Yarn
Yarn을 사용함으로써 패키지 관리 비용을 줄입니다.

### JWT-based authentication
JWT 기반의 토큰 인증을 구현해두었습니다. 자세한 내용은 [nestjs 문서](https://docs.nestjs.com/security/authentication#jwt-functionality)를 참고하세요. 

### Prettier w/ eslint
여러 IDE에서 동일한 code-style을 유지할 수 있도록 [Prettier](https://prettier.io/)를 사용합니다.

### TypeORM
nest.js 공식문서에서 소개하는 [TypeORM](https://typeorm.io/)을 이용합니다.

### Swagger doc
nest.js에서 제공하는 [swagger doc](https://docs.nestjs.com/openapi/introduction)이 설정되어있습니다. 

### Integration test
기본적인 Integration test + github action coverage 기능이 구현되어 있습니다

---

## Domains

### user domain
email / password 기반 유저 관리 시스템

### post domain
간단한 post 및 reaction 시스템

### social domain
user간 following 에 대한 시스템

---

## Architecture

![mermaid-diagram-2023-02-12-174255.png](.docs%2Fmermaid-diagram-2023-02-12-174255.png)
### Microserivce-like Layer + Domain-based 

Micro-service는 대부분의 서비스에서 Overkill일 것이라 확신합니다. 하지만, micro-service 형태의 layer를 mono-service에서도 적용할 수 있습니다. 
아래 4개의 Layer 구분을 통해, 서비스가 확장되며, 점진적인 리팩토링 혹은 microservice로의 전환을 보다 쉽게 꾀할 수 있을 것입니다.
더불어 각 Layer의 구분으로, 서비스 성장에 따른 `개발 부채`가 급격하게 서비스 전체로 전파되는 것을 막을 수 있을 것입니다.

#### 참조에 대한 Rules
- `Interface Layer`는 `Application layer` 를 참조할 수 있습니다.
- `Application Layer`는 `Domain layer` 를 참조할 수 있습니다.
- `Infrastructure Layer`는 `모든 Layer` 에 참조될 수 있습니다.

#### Domain Layer내의 Rules
- 다른 Domain을 참조할 수 없습니다.
- 다른 Domain 내의 Entity와 Join 해서는 안됩니다.
- DDD에 대한 개념이 있으시다면 Domain내의 service들은 Aggregate Root로 간주하셔도 좋을 것 같습니다.
 

### Layer별 R&R
#### Interface

외부와의 접점을 나타냅니다. `Controller 구현체`, `Graqhql 구현체`, `view model(response)` 등이 속합니다. 

- RestfulModule
  - API 계층을 나타냅니다.

#### Application

여러 domain service를 조합해 실제 비즈니스 로직을 수행합니다. 
예를 들어, user간의 관계를 나타내는 `social domain`과 post를 불러오는 `post domain`이 합쳐서, `내가 follow중인 사용자들의 posts` 를 가져오게 됩니다.

- UserAppModule
- PostAppModule
- SocialAppModule

#### Domain

Domain은 어려운 개념입니다. DDD에서 차용된 개념인 `domain` 은 서비스마다 다르고 나누는 기법마다 다르게 나눌 수 있습니다.
해당 `boilerplate`에서는 아래와 같이 나누었습니다. 

각 도메인은 서로에게 독립적이어야합니다.

- UserDomainModule
  - UserEntity
- PostDomainModule
  - PostEntity
  - PostReactionEntity
- SocialDomainModule
  - UserFollowEntity
- AuthDomainModule

#### Infrastructure

외부 리소스 등을 사용하는 서비스들이 존재합니다. 또한, 여러 서비스에서 공통적으로 사용되는 유틸 및 리소스가 여기 정의됩니다.

### Result Pattern
```typescript
 async findFollowerIdsByUserId(toUserId: number): Promise<Result<number[]>> {
   const result = await this.userFollowRepository.findMany({
     where: {
       toUserId,
     },
   });
   if (result.isFailure()) {
     return Result.failure(result.exception());
   }
   return Result.success(result.getOrThrow().map((v) => v.fromUserId));
 }
```

[Result Pattern](https://medium.com/@cummingsi1993/the-operation-result-pattern-a-simple-guide-fe10ff959080)은 정규화된 Pattern은 아닙니다.
`Result Pattern`은 기존의 error를 throw 하는 방식이 아닌, result 객채로 wrapping을 해 `value` 또는 `error` 를 상위로 전파하는 기법입니다.
이렇게 wrapping 된 값이 상위로 전파된다면, `상위 Layer`에서는 `하위 Layer`에서 발생하는 `error`에 대한 정보를 쉽게 인지할 수 있으며, 여러 개발자들이 협업할 때, 큰 도움이 됩니다.

참고 
- https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-result/
- https://toss.tech/article/kotlin-result

---

## 문의 및 PR

- `Issue`를 사용해주세요.
