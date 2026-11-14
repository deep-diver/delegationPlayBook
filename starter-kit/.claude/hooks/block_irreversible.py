#!/usr/bin/env python3
"""
.claude/hooks/block_irreversible.py

Claude Code PreToolUse 결정론적 안전 게이트 스크립트.
Bash 명령어 실행 직전 표준 입력(stdin)으로 전달된 호출 인자 JSON을 검사하여,
비가역적 삭제·강제 반영·무단 외부 전송 패턴이 감지되면 종료 코드 2를 반환해 실행을 즉시 차단한다.
"""

import json
import re
import sys
from typing import List, Tuple


BLOCKED_RULES: List[Tuple[str, str]] = [
    (
        r"\brm\s+-[a-zA-Z]*r[a-zA-Z]*f\b|\brm\s+-[a-zA-Z]*f[a-zA-Z]*r\b",
        "재귀 강제 삭제(rm -rf) 명령",
    ),
    (
        r"\brm\b.*\./raw\b|\brm\b.*\braw/",
        "원본 데이터 보관소(raw/) 파일 삭제 시도",
    ),
    (
        r"\bgit\s+push\s+.*(--force|-f|--force-with-lease)\b",
        "원격 브랜치 강제 푸시(force push)",
    ),
    (
        r"\bgit\s+reset\s+--hard\b|\bgit\s+clean\s+-[a-zA-Z]*f",
        "커밋되지 않은 로컬 작업 강제 초기화(git reset --hard / git clean -f)",
    ),
    (
        r"\b(DROP|TRUNCATE)\s+(TABLE|DATABASE|SCHEMA)\b",
        "데이터베이스 테이블·스키마 파괴 쿼리(DROP/TRUNCATE)",
    ),
    (
        r"\bDELETE\s+FROM\b(?!.*\bWHERE\b)",
        "조건절(WHERE) 없는 전체 행 삭제 쿼리",
    ),
    (
        r"\bterraform\s+(destroy|apply\s+.*-auto-approve)\b",
        "인프라 무승인 변경 또는 삭제(terraform destroy / auto-approve)",
    ),
    (
        r"\bcurl\b.*(-X\s*(POST|PUT|PATCH|DELETE)|--data|-d\s|-F\s|--upload-file)",
        "외부 엔드포인트로의 데이터 전송 요청(curl POST/PUT/DELETE/data)",
    ),
]


def main() -> None:
    raw_input = sys.stdin.read().strip()
    if not raw_input:
        sys.exit(0)

    try:
        payload = json.loads(raw_input)
    except json.JSONDecodeError:
        sys.exit(0)

    tool_name = payload.get("tool_name", "")
    if tool_name != "Bash":
        sys.exit(0)

    tool_input = payload.get("tool_input") or {}
    command = str(tool_input.get("command", ""))

    for pattern, reason in BLOCKED_RULES:
        if re.search(pattern, command, re.IGNORECASE):
            sys.stderr.write(
                f"[HARD GATE BLOCKED] 비가역적 위험 명령이 차단되었습니다.\n"
                f"- 차단 사유: {reason}\n"
                f"- 감지 명령: {command}\n"
                "- 행동 지침: 에이전트는 이 명령을 직접 실행할 수 없습니다. "
                "실행이 반드시 필요하다면 수행 목적과 영향 범위를 3줄로 요약하여 "
                "인간 위임자에게 수동 실행 또는 승인을 요청하세요.\n"
            )
            # 종료 코드 2: Claude Code 런타임에서 도구 실행을 즉시 취소(Abort)하고 stderr를 에이전트에 반환함
            sys.exit(2)

    sys.exit(0)


if __name__ == "__main__":
    main()
