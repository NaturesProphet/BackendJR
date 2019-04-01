sonar-scanner \
  -Dsonar.projectKey=backend-jr \
  -Dsonar.sources=src \
  -Dsonar.sourceEncoding=UTF-8 \
  -Dsonar.language=ts \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=2aa53fdaa4c2721d0ff34cfedc087c0d8440be30 \
  -Dsonar.coverage.exclusions=**/*.spec.ts,**/*.dto.ts,**/__mocks__/**,**/*.module.ts,**/common/**,**/main.ts,**/*.controller.ts,**/*.config.ts,**/*.model.ts \
  -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info