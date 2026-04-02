<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>KATRI 신고</span>
      <span>사고 신고서 조회</span>
    </section>
    <section class="page">
      <article class="table">
        <strong>사고 신고</strong>
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>신고 번호</th>
              <td>{{ allData.id }}</td>
              <th>갱신 번호</th>
              <td>{{ allData?.hisList?.[0]?.renewalId }}</td>
              <th>신고 접수일</th>
              <td>{{ getDate(allData.incidentDate) }}</td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <strong>사고 신고자 기본 정보</strong>
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>제조사</th>
              <td>{{ allData.manufacturer }}</td>
              <th>담당자</th>
              <td>{{ allData.name }}</td>
            </tr>
            <tr>
              <th>전자우편</th>
              <td>{{ allData.email }}</td>
              <th>연락처</th>
              <td>{{ allData.phone }}</td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <strong>갱신 이력</strong>
        <table>
          <tbody>
            <tr v-for="(item) in allData.hisList.slice(0,5)" v-if="allData?.hisList && allData.hisList.length > 0">
              <th>갱신 번호</th>
              <td>{{ item.renewalId }}</td>
              <th>갱신 등록일</th>
              <td>{{ getDate(item.createdAt) }}</td>
            </tr>
            <tr v-else>
              <th>갱신 이력이 없습니다.</th>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="group button">
        <router-link 
          v-if="allData?.status !== 'FINISH'"
          :to="{ name: 'katri_report_close', params: { id: allData?.id } }">
          <button :disabled="!allData.id">종료</button>
        </router-link>
        <router-link 
          v-if="allData?.status !== 'FINISH'"
          :to="{ name: 'katri_report_update', params: { id: allData?.id } }">
          <button :disabled="!allData.id">갱신</button>
        </router-link>
        <button class="line" @click="router.push({name:'katri_management'})">목록</button>
      </article>
      <article class="table">
        <strong>사고 접수 내역</strong>
        <table>
          <colgroup>
            <col width="200px" />
            <col width="280px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th rowspan="3">사고 일시</th>
              <th>사이버보안 사고 발생 일시</th>
              <td>{{ getDate(allData.accidentDate) }}</td>
            </tr>
            <tr>
              <th>사이버보안 사고 감지 일시</th>
              <td>{{ getDate(allData.detectDate) }}</td>
            </tr>
            <tr>
              <th>최초 사이버보안 사고 신고 일시</th>
              <td>{{ getDate(allData.incidentDate) }}</td>
            </tr>
            <tr>
              <th rowspan="7">사고유형 및 정도</th>
              <th>안전사고</th>
              <td>
                <div class="group">
                  {{ allData.safetyAccDesc }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.safetyAccDesc)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>개인정보사고</th>
              <td>
                <div class="group">
                  {{ allData.privacyAccDesc }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.privacyAccDesc)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>금융피해사고</th>
              <td>
                <div class="group">
                  {{ allData.financeAccDesc }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.financeAccDesc)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>차량운영피해사고</th>
              <td>
                <div class="group">
                  {{ allData.vehOpAccDesc }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.vehOpAccDesc)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>기타 (차량 관련 시스템 피해 사고)</th>
              <td>
                <div class="group">
                  {{ allData.etcAccDesc }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.etcAccDesc)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>정보통신망법 침해사고 해당여부</th>
              <td>
                <div class="group">
                  {{ parsingIsnetworklawviol }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(parsingIsnetworklawviol)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>미디어 노출 여부 (링크 or 정보)</th>
              <td>
                <div class="group">
                  {{ allData.mediaExposureInfo }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.mediaExposureInfo)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th rowspan="5">피해 시스템</th>
              <th>차종</th>
              <td>
                <div class="group">
                  {{ allData.vehType }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.vehType)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>연식</th>
              <td>
                <div class="group">
                  {{ allData.vehYear }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.vehYear)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>부품/시스템</th>
              <td>
                <div class="group">
                  {{ allData.partSysNm }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.partSysNm)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>부품 모델명/모델번호</th>
              <td>
                <div class="group">
                  {{ allData.partModelNm }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.partModelNm)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>(차량 외부)서비스 시스템</th>
              <td>
                <div class="group">
                  {{ allData.extSys }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.extSys)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th rowspan="3">피해 범위</th>
              <th>(식별된) 피해 차량 대수</th>
              <td>
                <div class="group">
                  {{ allData.dmgVehCnt }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.dmgVehCnt)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>(식별된) 피해 사람 수</th>
              <td>
                <div class="group">
                  {{ allData.dmgPrsnCnt }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.dmgPrsnCnt)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>(식별된) 피해 발생 시간(종료,계속)</th>
              <td>
                <div class="group">
                  {{ allData.dmgDurHour }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.dmgDurHour)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th rowspan="2">잠재적 피해 범위</th>
              <th>잠재 피해 대상 차량 대수 (취약 차량)</th>
              <td>
                <div class="group">
                  {{ allData.potentialVehDesc }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.potentialVehDesc)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>잠재 피해 대상 사람 수</th>
              <td>
                <div class="group">
                  {{ allData.potentialPrsnCnt }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.potentialPrsnCnt)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th colspan="2">조치계획(안) 제출 일시</th>
              <td>
                <div class="group">
                  {{ getDate(allData.planSubmitDate) }} / {{ allData.planSubmitDesc }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(sumCopyPlan)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th colspan="2">조치 완료 목표 일시</th>
              <td>
                <div class="group">
                  {{ getDate(allData.targetCompleteDate) }} / {{ allData.targetCompleteDesc }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(sumCopyTarget)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th colspan="2">신고 내용</th>
              <td>
                <div class="group">
                  {{ allData.incidentReportContent }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.incidentReportContent)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th colspan="2">파일 첨부</th>
              <td class="group" v-for="item in incidnetReceiptFile?.slice(0,3)">
                파일 ID : {{ item.id }} / 파일 설명 : {{ item.fileCategoryDescription }}
              </td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <strong>갱신 내역</strong>
        <table>
          <colgroup>
            <col width="200px" />
            <col width="280px" />
            <col width="auto" />
          </colgroup>
          <tbody v-if="allData?.renewal">
            <tr>
              <th colspan="2">공격자 정보</th>
              <td>
                <div class="group">
                  <pre>{{ allData.renewal.attackerInfo }}</pre>
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.renewal.attackerInfo)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th rowspan="1">공격 대상 분석</th>
              <th>보안 특성/공격 유형</th>
              <td>
                <div class="group">
                  {{ allData.renewal.attackTargetType }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.renewal.attackTargetType)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th rowspan="1">피해 분석</th>
              <th>공격 경로</th>
              <td>
                <div class="group">
                  {{ allData.renewal.attackPath }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.renewal.attackPath)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th rowspan="7">공격 분석</th>
              <th>기존 보안 방안 기술</th>
              <td>
                <div class="group">
                  {{ allData.renewal.existSecMeasure }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.renewal.existSecMeasure)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>금번 사고 취약점 원인 분석</th>
              <td>
                <div class="group">
                  {{ allData.renewal.causeAnalysis }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.renewal.causeAnalysis)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>금번 사고 공격 현실성/난이도 분석</th>
              <td>
                <div class="group">
                  {{ allData.renewal.attackDifficulty }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.renewal.attackDifficulty)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>대응/조치 후 예상 난이도 분석</th>
              <td>
                <div class="group">
                  {{ allData.renewal.postDifficulty }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.renewal.postDifficulty)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>관련 취약점 정보</th>
              <td>
                <div class="group">
                  {{ allData.renewal.vulnInfo }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.renewal.vulnInfo)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>관련 취약점 위험도</th>
              <td>
                <div class="group">
                  {{ allData.renewal.vulnRiskLvl }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.renewal.vulnRiskLvl)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>기존 평가 위험도</th>
              <td>
                <div class="group">
                  {{ allData.renewal.existRiskLvl }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.renewal.existRiskLvl)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th rowspan="2">위험도 분석</th>
              <th>금번 사고 위험도</th>
              <td>
                <div class="group">
                  {{ allData.renewal.currRiskLvl }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.renewal.currRiskLvl)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>대응/조치 후 위험도</th>
              <td>
                <div class="group">
                  {{ allData.renewal.postRiskLvl }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.renewal.postRiskLvl)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th colspan="2">대응/조치 계획</th>
              <td>
                <table>
                  <thead>
                    <tr>
                      <th>대응/조치 항목</th>
                      <th>대응/조치 계획 일정</th>
                      <th>대응/조치 내용</th>
                      <th>대응/조치 현황</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="allData.renewal.renewalAction && allData.renewal.renewalAction.length > 0"
                        v-for="(item,idx) in allData.renewal.renewalAction" :key="idx">
                      <td>{{ item.actionItem }}</td>
                      <td>{{ getDate(item.actionPlanDate) }}</td>
                      <td>{{ item.actionContent }}</td>
                      <td>{{ item.actionStatus }}</td>
                    </tr>
                    <tr v-else>
                      <td colspan="5">내역이 없습니다.</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <th colspan="2">파일 첨부</th>
              <td class="group" v-for="item in incidnetRenewalFile?.slice(0,3)">
                파일 ID : {{ item.id }} / 파일 설명 : {{ item.fileCategoryDescription }}
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <th colspan="5">갱신 내역이 없습니다.</th>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

// KATRI 사고 신고서 상세 조회 전체 데이터 상태값
const allData = ref({
  renewal: {
    attackerInfo: "",
    attackTargetType: "",
    attackPath: "",
    existSecMeasure: "",
    causeAnalysis: "",
    attackDifficulty: "",
    postDifficulty: "",
    vulnInfo: "",
    vulnRiskLvl: "",
    existRiskLvl: "",
    currRiskLvl: "",
    postRiskLvl: "",
  }
});

// 조치 계획안 제출 일시, 설명 / 조치 완료 목표 일시, 설명을 한번에 복사하는 데이터 상태값
const sumCopyPlan = ref("");
const sumCopyTarget = ref("");

// 정보통신망법 침해사고 해당여부 1 -> Y / 0 -> N paring 처리
const parsingIsnetworklawviol = computed(() => {
  if(allData?.value.isNetworkLawViol === 1) return "Y";
  if(allData?.value.isNetworkLawViol === 0) return "N";
  return "";
});

// 신고 접수일 parsing 처리
const padZero = (num) => String(num).padStart(2, "0");

const formatDate = (date, includeTime = true) => {
  const yyyy = date.getFullYear();
  const MM = padZero(date.getMonth() + 1);
  const dd = padZero(date.getDate());
  let formattedDate = `${yyyy}-${MM}-${dd}`;

  if (includeTime) {
    const hh = padZero(date.getHours());
    const mm = padZero(date.getMinutes());
    formattedDate += ` ${hh}:${mm}`;
  }

  return formattedDate;
};

const getDate = (dateString) => formatDate(new Date(dateString));

// 파일 (신고서 접수 자료/신고서 갱신 자료) Parsing (테스트중)
const incidnetReceiptFile = computed(() => {
  return allData.value?.fileList?.filter( item => item.fileCategoryDescription === "신고서 접수 자료")})

const incidnetRenewalFile = computed(() => {
  return allData.value?.fileList?.filter( item => item.fileCategoryDescription === "신고서 갱신 자료")})

// KATRI 상세 조회 API 호출
const getfetch_katri_detail = async () => {
  try {
    const incidentId = Number(route.params.id);
    const res = await axios.get(`/api/vsoc/incident/${incidentId}/GENERAL`);
    allData.value = res.data.data.incident;

    if(allData.value.safetyAccDesc === null) {
      allData.value.safetyAccDesc = "해당사항 없음";
    }
    if (allData.value.privacyAccDesc === null) {
      allData.value.privacyAccDesc = "해당사항 없음";
    }
    if (allData.value.financeAccDesc === null) {
      allData.value.financeAccDesc = "해당사항 없음";
    }
    if (allData.value.vehOpAccDesc === null) {
      allData.value.vehOpAccDesc = "해당사항 없음";
    }
    if (allData.value.etcAccDesc === null) {
      allData.value.etcAccDesc = "해당사항 없음";
    }

    sumCopyPlan.value = `${getDate(allData.value.planSubmitDate)} ${allData.value.planSubmitDesc}`;
    sumCopyTarget.value = `${getDate(allData.value.targetCompleteDate)} ${allData.value.targetCompleteDesc}`;
  } catch (error) {
    console.error(error);
    alert('데이터 불러오기 실패');
  }
}

// 해당 텍스트 클립보드 복사 기능
const copyText = async (value) => {
  try {
    await navigator.clipboard.writeText(value);
    alert('복사 되었습니다.');
  } catch (error) {
    console.error(error);
  }
}

onMounted(getfetch_katri_detail);
</script>