<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>모니터링 리포트</span>
      <span>리포트 수정</span>
    </section>
    <section class="step">
      <ul>
        <li>
          <strong>Event Report</strong>
        </li>
        <li>
          <strong>Weakness Report</strong>
        </li>
        <li class="active">
          <strong>Vulnerability Report</strong>
        </li>
        <li>
          <strong>Cybersecurity Incident Response Report</strong>
        </li>
      </ul>
    </section>
    <section class="page write">
      <article class="table">
        <p class="guide">
          * 표시는 필수 입력 항목입니다.
        </p>
        <strong>기본</strong>
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>Vulnerability ID</th>
              <td>{{ getData?.id }}</td>
              <th>Weakness ID</th>
              <td>{{ getData?.weaknessReport?.id }}</td>
            </tr>
            <tr>
              <th>제품명</th>
              <td>{{ eventData?.productName }}</td>
              <th>프로젝트명</th>
              <td>{{ eventData?.projectName }}</td>
            </tr>
            <tr>
              <th>프로젝트 취약점 ID <br />(해당하는 경우만)</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="프로젝트 취약점 ID를 입력해주세요"
                />
              </td>
              <th>Asset 이름</th>
              <td>{{ eventData?.associatedAsset }}</td>
            </tr>
            <tr>
              <th>사이버 보안 자산</th>
              <td class="input">
                {{ getData?.weaknessReport?.cyberAsset }}
              </td>
              <th>공격 시나리오</th>
              <td class="input">
                <input type="text" placeholder="공격 시나리오를 입력해주세요" />
              </td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <strong>분석 전</strong>
        <table>
          <colgroup>
            <col width="120px" />
            <col width="120px" />
            <col width="auto" />
            <col width="120px" />
            <col width="120px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th rowspan="2">영향</th>
              <th class="required">운영</th>
              <td class="select">
                <select v-model="postData.data.preImpactOperation">
                  <option disabled value="">선택</option>
                  <option value="심각한(Severe)">심각한(Severe)</option>
                  <option value="주요한(Major)">주요한(Major)</option>
                  <option value="보통의(Moderate)">보통의(Moderate)</option>
                  <option value="무시할 수 있는(Negigible)">무시할 수 있는(Negligible)</option>
                </select>
              </td>
              <th rowspan="2">영향</th>
              <th class="required">안전</th>
              <td class="select">
                <select v-model="postData.data.preImpactSafety">
                  <option disabled value="">선택</option>
                  <option value="심각한(Severe)">심각한(Severe)</option>
                  <option value="주요한(Major)">주요한(Major)</option>
                  <option value="보통의(Moderate)">보통의(Moderate)</option>
                  <option value="무시할 수 있는(Negligible)">무시할 수 있는(Negligible)</option>
                </select>
              </td>
            </tr>
            <tr>
              <th class="required">개인 정보</th>
              <td class="select">
                <select v-model="postData.data.preImpactPrivacy">
                  <option disabled value="">선택</option>
                  <option value="심각한(Severe)">심각한(Severe)</option>
                  <option value="주요한(Major)">주요한(Major)</option>
                  <option value="보통의(Moderate)">보통의(Moderate)</option>
                  <option value="무시할 수 있는(Negligible)">무시할 수 있는(Negligible)</option>
                </select>
              </td>
              <th class="required">재정</th>
              <td class="select">
                <select v-model="postData.data.preImpactFinancial">
                  <option disabled value="">선택</option>
                  <option value="심각한(Severe)">심각한(Severe)</option>
                  <option value="주요한(Major)">주요한(Major)</option>
                  <option value="보통의(Moderate)">보통의(Moderate)</option>
                  <option value="무시할 수 있는(Negligible)">무시할 수 있는(Negligible)</option>
                </select>
              </td>
            </tr>
            <tr>
              <th colspan="2" class="required">영향 등급</th>
              <td class="select">
                <select v-model="postData.data.preImpactRating">
                  <option disabled value="">선택</option>
                  <option value="심각한(Severe)">심각한(Severe)</option>
                  <option value="주요한(Major)">주요한(Major)</option>
                  <option value="보통의(Moderate)">보통의(Moderate)</option>
                  <option value="무시할 수 있는(Negligible)">무시할 수 있는(Negligible)</option>
                </select>
              </td>
              <th colspan="2" class="required">위협 시나리오</th>
              <td class="input">
                <input type="text" placeholder="위협 시나리오를 입력해주세요" v-model="postData.data.preThreatScenario"/>
              </td>
            </tr>
            <tr>
              <th colspan="2" class="required">공격 경로</th>
              <td class="input">
                <input type="text" placeholder="공격 경로를 입력해주세요" v-model="postData.data.preAttackPath"/>
              </td>
              <th colspan="2" class="required">위험 처리 방안</th>
              <td class="input">
                <input type="text" placeholder="위험 처리 방안을 입력해주세요" v-model="postData.data.preRiskTreatmentPlan"/>
              </td>
            </tr>
            <tr>
              <th rowspan="3">공격 가능성</th>
              <th class="required">소요 시간
                <div class="tooltip">
                  <i></i>
                  <p>0~19사이 숫자만 입력해주세요.</p>
                </div>
              </th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="소요 시간 입력 (0~19 사이 값)" 
                  v-model.number="postData.data.preAfElapsedTime"
                  @input="onlyNumber($event, postData.data, 'preAfElapsedTime')"
                  />
              </td>
              <th rowspan="3">공격 가능성</th>
              <th class="required">한정된 기회
                <div class="tooltip">
                  <i></i>
                  <p>1~10사이 숫자만 입력해주세요.</p>
                </div>
              </th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="기회 점수 입력 (1~10 사이 값)" 
                  v-model.number="postData.data.preAfWindowOfOpportunity"
                  @input="onlyNumber($event, postData.data, 'preAfWindowOfOpportunity')"
                  />
              </td>
            </tr>
            <tr>
              <th class="required">기술 전문성
                <div class="tooltip">
                  <i></i>
                  <p>0~8사이 숫자만 입력해주세요.</p>
                </div>
              </th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="기술 전문성 점수 입력 (0~8 사이 값)" 
                  v-model.number="postData.data.preAfTechnicalExpertise"
                  @input="onlyNumber($event, postData.data, 'preAfTechnicalExpertise')"
                  />
              </td>
              <th class="required">장비
                <div class="tooltip">
                  <i></i>
                  <p>0~9사이 숫자만 입력해주세요.</p>
                </div>
              </th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="장비 점수 입력 (0~9 사이 값)" 
                  v-model.number="postData.data.preAfEquipment"
                  @input="onlyNumber($event, postData.data, 'preAfEquipment')"
                  />
              </td>
            </tr>
            <tr>
              <th class="required">아이템에 대한 지식
                <div class="tooltip">
                  <i></i>
                  <p>1~11사이 숫자만 입력해주세요.</p>
                </div>
              </th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="기술 전문성 점수 입력 (1~11 사이 값)" 
                  v-model.number="postData.data.preAfKnowledgeOfItem"
                  @input="onlyNumber($event, postData.data, 'preAfKnowledgeOfItem')"
                  />
              </td>
              <th>합계</th>
              <td class="input">
                <input type="text" v-model="preSum" disabled />
              </td>
            </tr>
            <tr>
              <th colspan="2">공격 가능성 등급</th>
              <td class="input">
                <input type="text" v-model="preAttackRank" disabled />
              </td>
              <th colspan="2" class="required">위험도 평가
                <div class="tooltip">
                  <i></i>
                  <p>1~5사이 숫자만 입력해주세요.</p>
                </div>
              </th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="위험도 평가 점수 입력 (1~5 사이 값)" 
                  v-model.number="postData.data.preRiskAssessment"
                  @input="onlyNumber($event, postData.data, 'preRiskAssessment')"
                  />
              </td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <strong>분석 후</strong>
        <table>
          <colgroup>
            <col width="120px" />
            <col width="120px" />
            <col width="auto" />
            <col width="120px" />
            <col width="120px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th rowspan="3">공격 가능성</th>
              <th class="required">소요 시간
                <div class="tooltip">
                  <i></i>
                  <p>0~19사이 숫자만 입력해주세요.</p>
                </div>
              </th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="소요 시간 입력 (0~19 사이 값)" 
                  v-model.number="postData.data.postAfElapsedTime"
                  @input="onlyNumber($event, postData.data, 'postAfElapsedTime')"
                  />
              </td>
              <th rowspan="3">공격 가능성</th>
              <th class="required">한정된 기회
                <div class="tooltip">
                  <i></i>
                  <p>1~10사이 숫자만 입력해주세요.</p>
                </div>
              </th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="기회 점수 입력 (1~10 사이 값)" 
                  v-model.number="postData.data.postAfWindowOfOpportunity"
                  @input="onlyNumber($event, postData.data, 'postAfWindowOfOpportunity')"
                  />
              </td>
            </tr>
            <tr>
              <th class="required">기술 전문성
                <div class="tooltip">
                  <i></i>
                  <p>0~8사이 숫자만 입력해주세요.</p>
                </div>
              </th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="기술 전문성 점수 입력 (0~8 사이 값)" 
                  v-model.number="postData.data.postAfTechnicalExpertise"
                  @input="onlyNumber($event, postData.data, 'postAfTechnicalExpertise')"
                  />
              </td>
              <th class="required">장비
                <div class="tooltip">
                  <i></i>
                  <p>0~9사이 숫자만 입력해주세요.</p>
                </div>
              </th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="장비 점수 입력 (0~9 사이 값)" 
                  v-model.number="postData.data.postAfEquipment"
                  @input="onlyNumber($event, postData.data, 'postAfEquipment')"
                  />
              </td>
            </tr>
            <tr>
              <th class="required">아이템에 대한 지식
                <div class="tooltip">
                  <i></i>
                  <p>1~11사이 숫자만 입력해주세요.</p>
                </div>
              </th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="기술 전문성 점수 입력 (1~11 사이 값)" 
                  v-model.number="postData.data.postAfKnowledgeOfItem"
                  @input="onlyNumber($event, postData.data, 'postAfKnowledgeOfItem')"
                  />
              </td>
              <th>합계</th>
              <td class="input">
                <input type="text" v-model="postSum" disabled />
              </td>
            </tr>
            <tr>
              <th colspan="2">공격 가능성 등급</th>
              <td class="input">
                <input type="text" v-model="postAttackRank" disabled />
              </td>
              <th colspan="2" class="required">위험도 평가
                <div class="tooltip">
                  <i></i>
                  <p>1~5사이 숫자만 입력해주세요.</p>
                </div>
              </th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="위험도 평가 점수 입력 (1~5 사이 값)" 
                  v-model.number="postData.data.postAfRiskScore"
                  @input="onlyNumber($event, postData.data, 'postAfRiskScore')"
                  />
              </td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th class="required">설명</th>
              <td colspan="3" class="input">
                <input type="text" placeholder="설명을 입력해주세요" v-model="postData.data.postDescription"/>
              </td>
            </tr>
            <tr>
              <th class="required">담당자</th>
              <td class="input">
                <input type="text" placeholder="담당자 이름을 입력해주세요" v-model="postData.data.postManager"/>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <strong>취약점 관리</strong>
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>Vulnerability Management ID</th>
              <td>-</td>
              <th>제품명</th>
              <td>{{ eventData?.productName }}</td>
            </tr>
            <tr>
              <th>프로젝트명</th>
              <td>{{ eventData?.projectName }}</td>
              <th>Vulnerability ID</th>
              <td>{{ getData?.id }}</td>
            </tr>
            <tr>
              <th>연관된 Asset</th>
              <td>{{ eventData?.associatedAsset }}</td>
              <th class="required">분석 후 위험도
                <div class="tooltip">
                  <i></i>
                  <p>1~5사이 숫자만 입력해주세요.</p>
                </div>
              </th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="분석 후 위험도 점수 입력 (1~5 사이 값)" 
                  v-model.number="postData.data.postRiskScore"
                  @input="onlyNumber($event, postData.data, 'postRiskScore')"
                  />
              </td>
            </tr>
            <tr>
              <th class="required">위험 관리 방안</th>
              <td class="input">
                <input type="text" placeholder="위험 관리 방안을 입력해주세요" v-model="postData.data.riskMgmtPlan"/>
              </td>
              <th class="required">처리 후 위험도
                <div class="tooltip">
                  <i></i>
                  <p>1~5사이 숫자만 입력해주세요.</p>
                </div>
              </th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="처리 후 위험도 점수 입력 (1~5 사이 값)" 
                  v-model.number="postData.data.treatedRiskScore"
                  @input="onlyNumber($event, postData.data, 'treatedRiskScore')"
                  />
              </td>
            </tr>
            <tr>
              <th class="required">담당자</th>
              <td class="input">
                <input type="text" placeholder="담당자 이름을 입력해주세요" v-model="postData.data.manager"/>
              </td>
              <th class="required">최근 취약점 관리 일자</th>
              <td>
                <div class="input calendar">
                  <Datepicker
                    v-model="postData.data.lastMgmtDate"
                    format="yyyy-MM-dd"
                    model-type="format"
                    :enable-time-picker="false"
                    :clearable="false"
                    :hideInputIcon="true"
                    locale="ko"></Datepicker>
                  <label></label>
                </div>
              </td>
            </tr>
            <tr>
              <th class="required">취약점 관리 시작 일자</th>
              <td>
                <div class="input calendar">
                  <Datepicker
                    v-model="postData.data.startMgmtDate"
                    format="yyyy-MM-dd"
                    model-type="format"
                    :enable-time-picker="false"
                    :clearable="false"
                    :hideInputIcon="true"
                    locale="ko"></Datepicker>
                  <label></label>
                </div>
              </td>
              <th class="required">취약점 관리 종료 일자</th>
              <td>
                <div class="input calendar">
                  <Datepicker
                    v-model="postData.data.endMgmtDate"
                    format="yyyy-MM-dd"
                    model-type="format"
                    :enable-time-picker="false"
                    :clearable="false"
                    :hideInputIcon="true"
                    locale="ko"></Datepicker>
                  <label></label>
                </div>
              </td>
            </tr>
            <tr>
              <th class="required">취약점 관리 상태</th>
              <td class="select">
                <select v-model="postData.data.mgmtStatus">
                  <option disabled value="">선택</option>
                  <option value="관리 중">관리 중</option>
                  <option value="관리 종료">관리 종료</option>
                </select>
              </td>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>취약점 관리 상태</th>
              <td class="file" colspan="3">
                <form @submit.prevent="postfetch_vulnerability_report_evidence_file">
                  <div class="group">
                    <div class="input">
                      <input type="text" placeholder="업로드할 파일을 선택하세요" :value="vulnerabilityEvidenceData.fileCategory" readonly>
                      <label>파일 선택
                        <input type="file" @change="onVulnerabilityFileChange" />
                      </label>
                    </div>
                    <div class="button">
                      <button type="submit">업로드</button>
                    </div>
                  </div>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="group button">
        <button @click="openCancelConfirm" class="cancel">취소</button>
        <button @click="postfetch_vulner" :disabled="!isAllInput">저장</button>
      </article>

      <!-- modal -->
      <VsocModal />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAppStore } from '@/store/app';
import { getDate } from '@/common/common';
import axios from 'axios';
import VsocModal from '../../modal/VsocModal.vue';
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const store = useAppStore();
const router = useRouter();
const route = useRoute();

// 취약점 리포트 작성 POST 데이터
const postData = ref({
  reportType: "vulnerability",
  data: {
    id: route.params.vulnerabilityReportId,
    weaknessReportId: null,
    preImpactOperation: "",
    preImpactPrivacy: "",
    preImpactSafety: "",
    preImpactFinancial: "",
    preImpactRating: "",
    preThreatScenario: "",
    preAttackPath: "",
    preRiskTreatmentPlan: "",
    preAfElapsedTime: null,
    preAfTechnicalExpertise: null,
    preAfKnowledgeOfItem: null,
    preAfWindowOfOpportunity: null,
    preAfEquipment: null,
    preRiskAssessment: null,
    postAfElapsedTime: null,
    postAfTechnicalExpertise: null,
    postAfKnowledgeOfItem: null,
    postAfWindowOfOpportunity: null,
    postAfEquipment: null,
    postAfRiskScore: null,
    postDescription: "",
    postManager: "",
    postRiskScore: null,
    riskMgmtPlan: "",
    treatedRiskScore: null,
    manager: "",
    lastMgmtDate: "",
    startMgmtDate: "",
    endMgmtDate: "",
    mgmtStatus: "",
    fileAction: {
      fileType: "VULNERABILITY_REPORT",
      fileIdList: [],
      deleteFileIdList: null,
    },
  }
})

// 모니터링 리포트 취약점 리포트 상세조회 전체 데이터
const getData = ref(null);

// 모니터링 취약점 리포트 갱신 에서 필요한 이벤트 리포트 데이터 상태값
const eventData = ref(null);

const isValid = ref({
  eventReportId: "",
  weaknessReportId: "",
  vulnerabilityReportId: "",
  cyberReportId: "",
});

// 사용자가 필수 요소를 모두 입력해야 버튼 활성화
const isAllInput = computed(() => {
  return Object.values(postData.value.data).every(
    (value) => value !== null && value !== undefined && value !== ""
  );
});

// 숫자만 입력하게 가능
const onlyNumber = (e, target, key) => {
  target[key] = e.target.value.replace(/[^0-9]/g, "");
}

// 분석전 공격가능성/합계 데이터 상태값
const preSum = computed(() => {
  return [
    Number(postData.value.data.preAfElapsedTime),
    Number(postData.value.data.preAfTechnicalExpertise),
    Number(postData.value.data.preAfKnowledgeOfItem),
    Number(postData.value.data.preAfWindowOfOpportunity),
    Number(postData.value.data.preAfEquipment),
  ].reduce(( sum, value ) => sum + value, 0);
});

// 분석후 공격가능성/합계 데이터 상태값
const postSum = computed(() => {
  return [
    Number(postData.value.data.postAfElapsedTime),
    Number(postData.value.data.postAfTechnicalExpertise),
    Number(postData.value.data.postAfKnowledgeOfItem),
    Number(postData.value.data.postAfWindowOfOpportunity),
    Number(postData.value.data.postAfEquipment),
  ].reduce(( sum, value ) => sum + value, 0);
});

// 분석전 공격 가능성 등급 데이터 상태값
const preAttackRank = computed(() => {
  if(preSum.value <= 13) return "High";
  else if(preSum.value >= 14 && preSum.value < 23) return "Medium";
  else if(preSum.value >= 24 && preSum.value < 25) return "Low";
  else return "Very Low";
})

// 분석후 공격 가능성 등급 데이터 상태값
const postAttackRank = computed(() => {
  if(postSum.value <= 13) return "High";
  else if(postSum.value >= 14 && postSum.value < 23) return "Medium";
  else if(postSum.value >= 24 && postSum.value < 25) return "Low";
  else return "Very Low";
})

// 취약점 리포트 작성 API 호출
const postfetch_vulner = async() => {
  try {
    const res = await axios.post('/api/vsoc/monitoring-report',postData.value);
    if(res.data.resultCode === -1) {
      alert('데이터 전송 실패')
    } else {
      openSaveDone();
    }
  } catch (error) {
    console.error(error);
    alert('데이터 전송 실패');
  }
}

// 모니터링 취약점 리포트 상세조회 API 호출
const getfetch_vulner_detail = async() => {
  try {
    const vulnerabilityReportId = route.params.vulnerabilityReportId;
    const res = await axios.get(`/api/vsoc/monitoring-report/vulnerability/${vulnerabilityReportId}`);
    getData.value = res.data.data.report;

    postData.value.data.weaknessReportId = getData.value?.weaknessReport?.id ?? ""
    postData.value.data.preImpactOperation = getData.value?.preImpactOperation ?? ""
    postData.value.data.preImpactPrivacy = getData.value?.preImpactPrivacy ?? ""
    postData.value.data.preImpactSafety = getData.value?.preImpactSafety ?? ""
    postData.value.data.preImpactFinancial = getData.value?.preImpactFinancial ?? ""
    postData.value.data.preImpactRating = getData.value?.preImpactRating ?? ""
    postData.value.data.preThreatScenario = getData.value?.preThreatScenario ?? ""
    postData.value.data.preAttackPath = getData.value?.preAttackPath ?? ""
    postData.value.data.preRiskTreatmentPlan = getData.value?.preRiskTreatmentPlan ?? ""
    postData.value.data.preAfElapsedTime = getData.value?.preAfElapsedTime ?? ""
    postData.value.data.preAfTechnicalExpertise = getData.value?.preAfTechnicalExpertise ?? ""
    postData.value.data.preAfKnowledgeOfItem = getData.value?.preAfKnowledgeOfItem ?? ""
    postData.value.data.preAfWindowOfOpportunity = getData.value?.preAfWindowOfOpportunity ?? ""
    postData.value.data.preAfEquipment = getData.value?.preAfEquipment ?? ""
    postData.value.data.preRiskAssessment = getData.value?.preRiskAssessment ?? ""
    postData.value.data.postAfElapsedTime = getData.value?.postAfElapsedTime ?? ""
    postData.value.data.postAfTechnicalExpertise = getData.value?.postAfTechnicalExpertise ?? ""
    postData.value.data.postAfKnowledgeOfItem = getData.value?.postAfKnowledgeOfItem ?? ""
    postData.value.data.postAfWindowOfOpportunity = getData.value?.postAfWindowOfOpportunity ?? ""
    postData.value.data.postAfEquipment = getData.value?.postAfEquipment ?? ""
    postData.value.data.postAfRiskScore = getData.value?.postAfRiskScore ?? ""
    postData.value.data.postDescription = getData.value?.postDescription ?? ""
    postData.value.data.postManager = getData.value?.postManager ?? ""
    postData.value.data.postRiskScore = getData.value?.postRiskScore ?? ""
    postData.value.data.riskMgmtPlan = getData.value?.riskMgmtPlan ?? ""
    postData.value.data.treatedRiskScore = getData.value?.treatedRiskScore ?? ""
    postData.value.data.manager = getData.value?.manager ?? ""
    postData.value.data.lastMgmtDate =getDate(getData.value?.lastMgmtDate) ?? ""
    postData.value.data.startMgmtDate = getDate(getData.value?.startMgmtDate) ?? ""
    postData.value.data.endMgmtDate = getDate(getData.value?.endMgmtDate) ?? ""
    postData.value.data.mgmtStatus = getData.value?.mgmtStatus ?? ""

  } catch (error) {
    console.error(error);
    alert('데이터 불러오기 실패');
  }
}

// 모니터링 취약점 리포트 갱신에서 필요한 이벤트 리포트 데이터 API 호출
const getfetch_button_link = async() => {
  try {
    const vulnerabilityReportId = Number(route.params.vulnerabilityReportId);
    const res = await axios.get('/api/vsoc/monitoring-report');
    isValid.value = res.data.data.monitoringReports.list.find((item)=>item.vulnerabilityReportId === vulnerabilityReportId);
    
    const res_plus = await axios.get(`/api/vsoc/monitoring-report/event/${isValid.value.eventReportId}`);
    eventData.value = res_plus.data.data.report;

  } catch (error) {
    console.error(error);
    alert('데이터 불러오기 실패');
  }
}

// Modal
const goList = () => {
  router.push({
    name: 'monitoring_vulner_detail',
    params: { vulnerabilityReportId: route.params.vulnerabilityReportId },
  })
}

const openSaveDone = () => {
  store.setModalInfo({
    on: true,
    type: "onebtn",
    iconClass: "success",
    textArea: "수정되었습니다.",
    btnText: "확인",

    rightBtn: () => { goList(); },
  })
};

const openCancelConfirm = () => {
  store.setModalInfo({
    on: true,
    type: "twobtn",
    iconClass: "warning",
    textArea: "아직 등록되지 않은 내용이 있습니다. 페이지를 나가면 작성하신 내용이 모두 사라집니다.",

    rightBtn: () => { goList(); },
  })
};

// 파일업로드 테스트 (현재 DLP 파일 반출 보안 문제로 file은 제외하고 테스트)
const vulnerabilityEvidenceData = ref({
  fileType: "VULNERABILITY_REPORT",
  fileCategory: "EVIDENCE",
  // file: null,
})

const onVulnerabilityFileChange = (e) => {
  vulnerabilityEvidenceData.value.file = e.target.files[0];
}

const postfetch_vulnerability_report_evidence_file = async() => {
  const formData = new FormData();
  formData.append("fileType",vulnerabilityEvidenceData.value.fileType);
  formData.append("fileCategory",vulnerabilityEvidenceData.value.fileCategory);
  // formData.append("file",vulnerabilityEvidenceData.value.file);
  
  try {
    const res = await axios.post('/api/vsoc/file',formData,{
      headers: {
        "Content-Type" : "multipart/form-data"
      }
    });
    console.log(res);
    const fileId = res.data.data.fileId;
    console.log(fileId);
    postData.value.data.fileAction.fileIdList.push(fileId);
    console.log(postData.value.data.fileAction.fileIdList);
  } catch (error) {
    console.error(error);
    alert('파일 업로드 실패');
  }
}
//

onMounted(() =>{
  getfetch_vulner_detail();
  getfetch_button_link();
});
</script>

<style scoped>
</style>