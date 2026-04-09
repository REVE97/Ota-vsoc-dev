<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>모니터링 리포트</span>
      <span>리포트 작성</span>
    </section>
    <section class="step">
      <ul>
        <li>
          <strong>Event Report</strong>
        </li>
        <li>
          <strong>Weakness Report</strong>
        </li>
        <li>
          <strong>Vulnerability Report</strong>
        </li>
        <li class="active">
          <strong>Cybersecurity Incident Response Report</strong>
        </li>
      </ul>
    </section>
    <section class="page">
      <article class="table">
        <p class="guide">
          * 표시는 필수 입력 항목입니다.
        </p>
        <strong>최초</strong>
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>Cybersecurity Incident Response ID</th>
              <td colspan="3">-</td>
            </tr>
            <tr>
              <th class="required">사이버 보안 사고 발생 일시</th>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.occurDate"
                      format="yyyy-MM-dd"
                      model-type="format"
                      :enable-time-picker="false"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input clock">
                    <Datepicker
                      v-model="inputDateTime.occurTime"
                      format="HH:mm"
                      model-type="format"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"
                      time-picker
                      ></Datepicker>
                      <label></label>
                  </div>
                </div>
              </td>
              <th class="required">사이버 보안 사고 감지 일시</th>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.detectDate"
                      format="yyyy-MM-dd"
                      model-type="format"
                      :enable-time-picker="false"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input clock">
                    <Datepicker
                      v-model="inputDateTime.detectTime"
                      format="HH:mm"
                      model-type="format"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"
                      time-picker
                      ></Datepicker>
                      <label></label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th class="required">안전사고</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="신체적 피해 (부상·사망 등)로 이어질 수 있는 사고 여부와 세부 내용을 작성해주세요"
                  v-model="postData.data.safetyIncident"
                />
              </td>
              <th class="required">금융피해사고</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="결제·금융 정보 탈취 또는 부정 과금 등 경제적 피해 내용을 작성해주세요"
                  v-model="postData.data.financialDmg"
                />
              </td>
            </tr>
            <tr>
              <th class="required">개인정보 사고</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="개인 정보 (위치, 계정, 식별 정보 등) 유출·노출 여부와 세부 내용을 작성해주세요"
                  v-model="postData.data.privacyIncident"
                />
              </td>
              <th class="required">차량운영피해사고</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="차량 운행 불능·성능 저하 등 운용 상의 피해 여부를 작성해주세요"
                  v-model="postData.data.vehicleOpDmg"
                />
              </td>
            </tr>
            <tr>
              <th class="required">기타</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="서비스 플랫폼 장애 등 차량 관련 시스템 사고 내용을 작성해주세요"
                  v-model="postData.data.etcSystemDmg"
                />
              </td>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th class="required">피해 차종</th>
              <td class="input">
                <input type="text" placeholder="차종을 입력해주세요" v-model="postData.data.affectedVehicleModel"/>
              </td>
              <th class="required">피해 발생 시간</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="사고기 지속된 구간(시작~종료)을 입력해주세요"
                  v-model="postData.data.dmgOccurrenceTime"
                />
              </td>
            </tr>
            <tr>
              <th class="required">피해 부품/시스템</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="부품/시스템 모델명을 입력해주세요"
                  v-model="postData.data.affectedPartSystem"
                />
              </td>
              <th class="required">피해 차량 대수</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="사고 피해 차량 대수를 입력해주세요"
                  v-model="postData.data.affectedVehicleCount"
                />
              </td>
            </tr>
            <tr>
              <th class="required">피해 서비스 시스템</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="차량 외부의 서비스 시스템을 입력해주세요"
                  v-model="postData.data.affectedServiceSystem"
                />
              </td>
              <th class="required">피해 사람 수</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="사고 피해 탑승자·사용자 수를 입력해주세요"
                  v-model="postData.data.affectedPersonCount"
                />
              </td>
            </tr>
            <tr>
              <th class="required">잠재 피해 대상 차량 대수 (취약 차량)</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="잠재적 사고 피해 차량 대수를 입력하세요."
                  v-model="postData.data.potentialVehicleCount"
                />
              </td>
              <th class="required">잠재 피해 대상 사람 수</th>
              <td class="input">
                <input
                  type="text"
                  placeholder="잠재적 사고 피해 탑승자, 사용자 수를 입력해주세요."
                  v-model="postData.data.potentialPersonCount"
                />
              </td>
            </tr>
            <tr>
              <th class="required">정보통신망법 침해사고 해당여부</th>
              <td class="select">
                <select v-model.number="postData.data.isNetworkLawViolation" required>
                  <option disabled value="">선택</option>
                  <option value="1">Y</option>
                  <option value="0">N</option>
                </select>
              </td>
              <th class="required">미디어 노출 여부</th>
              <td>
                <div class="group">
                  <div class="select">
                    <select v-model.number="postData.data.isMediaExposed" required>
                      <option disabled value="">선택</option>
                      <option value="1">Y</option>
                      <option value="0">N</option>
                    </select>
                  </div>
                  <div class="input"> 
                    <input 
                      type="text" 
                      placeholder="미디어 노출 정보를 입력해주세요" 
                      v-model="postData.data.isMediaExposedInfo"
                      :disabled="postData.data.isMediaExposed === 0" />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th class="required">조치 계획(안) 제출 일시</th>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.planDate"
                      format="yyyy-MM-dd"
                      model-type="format"
                      :enable-time-picker="false"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input clock">
                    <Datepicker
                      v-model="inputDateTime.planTime"
                      format="HH:mm"
                      model-type="format"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"
                      time-picker
                      ></Datepicker>
                      <label></label>
                  </div>
                </div>
              </td>
              <th class="required">조치 완료 목표 일시</th>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.targetDate"
                      format="yyyy-MM-dd"
                      model-type="format"
                      :enable-time-picker="false"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input clock">
                    <Datepicker
                      v-model="inputDateTime.targetTime"
                      format="HH:mm"
                      model-type="format"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"
                      time-picker
                      ></Datepicker>
                      <label></label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th class="required">신고 내용</th>
              <td class="input">
                <input
                  type="text" placeholder="신고 내용에 대한 설명을 작성해주세요" v-model="postData.data.reportContent"/>
              </td>
              <th class="required">담당자</th>
              <td class="input">
                <input type="text" placeholder="담당자 이름을 입력해주세요" v-model="postData.data.manager"/>
              </td>
            </tr>
            <tr>
              <th>첨부파일</th>
              <td class="file" colspan="3">
                <form>
                  <div class="group">
                    <div class="input">
                      <input type="text" placeholder="업로드할 파일을 선택하세요" :value="cyberInitEvidenceData.file?.name" readonly>
                      <label>파일 선택
                        <input type="file" @change="(e) => onFileChange(e,cyberInitEvidenceData)" />
                      </label>
                    </div>
                  </div>
                </form>
              </td>
            </tr>
            <tr>
              <th>사이버보안 사고 대응 절차, 역할 및 대응 일정 보고서</th>
              <td class="file" colspan="3">
                <form>
                  <div class="group">
                    <div class="input">
                      <input type="text" placeholder="업로드할 파일을 선택하세요" :value="cyberInitProcedureData.file?.name" readonly>
                      <label>파일 선택
                        <input type="file" @change="(e) => onFileChange(e,cyberInitProcedureData)" />
                      </label>
                    </div>
                  </div>
                </form>
              </td>
            </tr>
            <tr>
              <th>사이버보안 사고 대응 계획 보고서</th>
              <td class="file" colspan="3">
                <form>
                  <div class="group">
                    <div class="input">
                      <input type="text" placeholder="업로드할 파일을 선택하세요" :value="cyberInitPlanData.file?.name" readonly>
                      <label>파일 선택
                        <input type="file" @change="(e) => onFileChange(e,cyberInitPlanData)" />
                      </label>
                    </div>
                  </div>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <strong>갱신</strong>
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th class="required">공격자 정보</th>
              <td class="input">
                <input type="text" placeholder="공격자 정보를 입력해주세요" v-model="postData.data.renewal.attackerInfo"/>
              </td>
              <th class="required">공격 경로</th>
              <td class="input">
                <input type="text" placeholder="공격 경로를 입력해주세요" v-model="postData.data.renewal.attackPath"/>
              </td>
            </tr>
            <tr>
              <th class="required">보안 특성/공격 유형</th>
              <td class="input">
                <input type="text" placeholder="보안 특성 / 공격 유형을 입력해주세요" v-model="postData.data.renewal.attackType"/>
              </td>
              <th class="required">기본 보안 방안 기술</th>
              <td class="input">
                <input type="text" placeholder="탐지에 사용된 솔루션·룰 등을 입력해주세요" v-model="postData.data.renewal.securityMeasureTech"/>
              </td>
            </tr>
            <tr>
              <th class="required">사고 취약점 원인 분석</th>
              <td class="input">
                <input type="text" placeholder="사고 발생 원인을 입력해주세요" v-model="postData.data.renewal.vulCauseAnalysis"/>
              </td>
              <th class="required">관련 취약점 정보</th>
              <td class="input">
                <input type="text" placeholder="연관된 공개 취약점 ID·링크를 입력해주세요" v-model="postData.data.renewal.relatedVulInfo"/>
              </td>
            </tr>
            <tr>
              <th class="required">사고 공격 현실성/난이도 분석</th>
              <td class="input">
                <input type="text" placeholder="공격 성공 가능성·난이도를 입력해주세요" v-model="postData.data.renewal.attackFeasibility"/>
              </td>
              <th class="required">관련 취약점 위험도</th>
              <td class="input">
                <input type="text" placeholder="관련 취약점의 CVSS 점수를 입력해주세요" v-model="postData.data.renewal.relatedVulRisk"/>
              </td>
            </tr>
            <tr>
              <th class="required">대응/조치 후 예상 난이도 분석</th>
              <td class="input">
                <input type="text" placeholder="대응/조치 후 예상 난이도를 입력해주세요" v-model="postData.data.renewal.postActionDifficulty"/>
              </td>
              <th class="required">기준 평가 위험도</th>
              <td class="input">
                <input type="text" placeholder="대응 전 위험도를 입력해주세요" v-model="postData.data.renewal.standardEvalRisk"/>
              </td>
            </tr>
            <tr>
              <th class="required">금번 사고 위험도</th>
              <td class="input">
                <input type="text" placeholder="사고 발생 직후 위험도를 입력해주세요" v-model="postData.data.renewal.currentIncidentRisk"/>
              </td>
              <th class="required">대응/조치 후 목표 위험도</th>
              <td class="input">
                <input type="text" placeholder="대응 완료 후 목표 위험도를 입력해주세요" v-model="postData.data.renewal.targetRisk"/>
              </td>
            </tr>
            <tr>
              <th class="required">대응/조치 항목</th>
              <td class="input">
                <input type="text" placeholder="수행한 조치 내용을 입력해주세요" v-model="postData.data.renewal.actionItem"/>
              </td>
              <th class="required">대응/조치 계획 일정</th>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.renewalActionDate"
                      format="yyyy-MM-dd"
                      model-type="format"
                      :enable-time-picker="false"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input clock">
                    <Datepicker
                      v-model="inputDateTime.renwalActionTime"
                      format="HH:mm"
                      model-type="format"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"
                      time-picker
                      ></Datepicker>
                      <label></label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th class="required">대응/조치 내용</th>
              <td class="input">
                <input type="text" placeholder="실제로 조치한 내용을 입력해주세요" v-model="postData.data.renewal.actionContent"/>
              </td>
              <th class="required">대응/조치 현황</th>
              <td class="input">
                <input type="text" placeholder="현재 조치 진행 상태를 입력해주세요" v-model="postData.data.renewal.actionStatus"/>
              </td>
            </tr>
            <tr>
              <th>첨부파일</th>
              <td class="file" colspan="3">
                <form>
                  <div class="group">
                    <div class="input">
                      <input type="text" placeholder="업로드할 파일을 선택하세요" :value="cyberRenewalEvidenceData.file?.name" readonly>
                      <label>파일 선택
                        <input type="file" @change="(e) => onFileChange(e,cyberRenewalEvidenceData)" />
                      </label>
                    </div>
                  </div>
                </form>
              </td>
            </tr>
            <tr>
              <th>사이버보안 사고 대응 계획 보고서</th>
              <td class="file" colspan="3">
                <form>
                  <div class="group">
                    <div class="input">
                      <input type="text" placeholder="업로드할 파일을 선택하세요" :value="cyberRenewalPlanData.file?.name" readonly>
                      <label>파일 선택
                        <input type="file" @change="(e) => onFileChange(e,cyberRenewalPlanData)" />
                      </label>
                    </div>
                  </div>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <strong>종료</strong>
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th class="required">대응/조치 항목</th>
              <td class="input">
                <input type="text" placeholder="수행한 조치 내용을 입력해주세요" v-model="postData.data.finish.actionItem"/>
              </td>
              <th class="required">대응/조치 내용</th>
              <td class="input">
                <input type="text" placeholder="실제로 조치한 내용을 입력해주세요" v-model="postData.data.finish.actionContent"/>
              </td>
            </tr>
            <tr>
              <th class="required">대응/조치 계획 일정</th>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.finishActionDate"
                      format="yyyy-MM-dd"
                      model-type="format"
                      :enable-time-picker="false"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input clock">
                    <Datepicker
                      v-model="inputDateTime.finishActionTime"
                      format="HH:mm"
                      model-type="format"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"
                      time-picker
                      ></Datepicker>
                      <label></label>
                  </div>
                </div>
              </td>
              <th class="required">대응/조치 현황</th>
              <td class="input">
                <input type="text" placeholder="탐지에 사용된 솔루션·룰 등을 입력해주세요" v-model="postData.data.finish.actionStatus"/>
              </td>
            </tr>
            <tr>
              <th>첨부파일</th>
              <td class="file" colspan="3">
                <form>
                  <div class="group">
                    <div class="input">
                      <input type="text" placeholder="업로드할 파일을 선택하세요" :value="cyberFinalEvidenceData.file?.name" readonly>
                      <label>파일 선택
                        <input type="file" @change="(e) => onFileChange(e,cyberFinalEvidenceData)" />
                      </label>
                    </div>
                  </div>
                </form>
              </td>
            </tr>
            <tr>
              <th>사고 대응 보고서</th>
              <td class="file" colspan="3">
                <form>
                  <div class="group">
                    <div class="input">
                      <input type="text" placeholder="업로드할 파일을 선택하세요" :value="cyberFinalReportData.file?.name" readonly>
                      <label>파일 선택
                        <input type="file" @change="(e) => onFileChange(e,cyberFinalReportData)" />
                      </label>
                    </div>
                  </div>
                </form>
              </td>
            </tr>
            <tr>
              <th class="required">대응 책임자</th>
              <td class="input">
                <input type="text" placeholder="대응 책임자 이름을 입력해주세요" v-model="postData.data.finish.responseManager"/>
              </td>
              <th class="required">대응 후 재평가 위험도</th>
              <td class="input">
                <input type="text" placeholder="대응 후 재평가 위험도를 입력해주세요" v-model="postData.data.finish.postReevalRisk" />
              </td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="group button">
        <button class="cancel" @click="openCancelConfirm">취소</button>
        <button @click="postfetch_cyber" :disabled="!isAllInput">완료</button>
      </article>

      <!-- modal -->
      <VsocModal />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useAppStore } from '@/store/app';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import VsocModal from '../../modal/VsocModal.vue';
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const store = useAppStore();
const router = useRouter();
const route = useRoute();

// 사이버 리포트 작성 POST 전체 데이터
const postData = ref({
  reportType: "cyber",
  data: {
    vulnerabilityReportId: route.params.vulnerabilityReportId,
    occurrenceDate: "",
    detectionDate: "",
    safetyIncident: "",
    financialDmg: "",
    privacyIncident: "",
    vehicleOpDmg: "",
    etcSystemDmg: "",
    isNetworkLawViolation: 0,
    isMediaExposed: 0,
    isMediaExposedInfo: "",
    affectedVehicleModel: "",
    dmgOccurrenceTime: "",
    affectedPartSystem: "",
    affectedVehicleCount: "",
    affectedServiceSystem: "",
    affectedPersonCount: "",
    potentialVehicleCount: "",
    potentialPersonCount: "",
    submissionDate: "",
    targetCompletionDate: "",
    reportContent: "",
    manager: "",
    renewal: {
      attackerInfo: "",
      attackPath: "",
      attackType: "",
      securityMeasureTech: "",
      vulCauseAnalysis: "",
      relatedVulInfo: "",
      attackFeasibility: "",
      relatedVulRisk: "",
      postActionDifficulty: "",
      standardEvalRisk: "",
      currentIncidentRisk: "",
      targetRisk: "",
      actionItem: "",
      actionPlanDate: "",
      actionContent: "",
      actionStatus: "",
    },
    finish: {
      actionItem: "",
      actionContent: "",
      actionPlanDate: "",
      actionStatus: "",
      responseManager: "",
      postReevalRisk: "",
    },
    fileAction: {
      fileType: "CYBER_REPORT",
      fileIdList: [],
      deleteFileIdList: null,
    },
  }
})

// 날짜/시간 따로 받는 데이터 상태값
const inputDateTime = ref({
  occurDate: "",
  occurTime: "",
  detectDate: "",
  detectTime: "",
  planDate: "",
  planTime: "",
  targetDate: "",
  targetTime: "",
  renewalActionDate: "",
  renwalActionTime: "",
  finishActionDate: "",
  finishActionTime: "",
})

// 사용자가 필수 요소를 모두 입력해야 버튼 활성화
const isAllInput = computed(() => {
  postData.value.data.occurrenceDate = `${inputDateTime.value.occurDate} ${inputDateTime.value.occurTime}`;
  postData.value.data.detectionDate = `${inputDateTime.value.detectDate} ${inputDateTime.value.detectTime}`;
  postData.value.data.submissionDate = `${inputDateTime.value.planDate} ${inputDateTime.value.planTime}`;
  postData.value.data.targetCompletionDate = `${inputDateTime.value.targetDate} ${inputDateTime.value.targetTime}`;
  postData.value.data.renewal.actionPlanDate = `${inputDateTime.value.renewalActionDate} ${inputDateTime.value.renwalActionTime}`;
  postData.value.data.finish.actionPlanDate = `${inputDateTime.value.finishActionDate} ${inputDateTime.value.finishActionTime}`;

  const inputBaseValid = Object.entries(postData.value.data).every(([key, value]) => {
    if (key === "isMediaExposedInfo") return true; // 미디어 노출 여부 정보는 필수 제외

    return value !== null && value !== undefined && value !== ""
  })

  const inputRenewalValid = Object.values(postData.value.data.renewal).every(
    (value) => value !== null && value !== undefined && value !== ""
  )

  const inputFinishValid = Object.values(postData.value.data.finish).every(
    (value) => value !== null && value !== undefined && value !== ""
  )

  return inputBaseValid && inputRenewalValid && inputFinishValid
});

// 미디어 노출 여부 N 으로 바뀔시 입력내용 초기화
watch(
  () => postData.value.data.isMediaExposed,
  (newVal) => {
    if (newVal === 0){
      postData.value.data.isMediaExposedInfo = "";
    }
  }
)

// 사이버 리포트 작성 API 호출 
const postfetch_cyber = async() => {
  try {
    const res = await axios.post('/api/vsoc/monitoring-report',postData.value);
    if(res.data.resultCode === -1) {
      alert('데이터 전송 실패');
    } else {
      openSaveDone();
    }
  } catch (error) {
    console.error(error);
    alert('데이터 전송 실패');
  }
}

// Modal
const goList = () => router.push({ name: "monitoring_management" });

const openSaveDone = () => {
  store.setModalInfo({
    on: true,
    type: "onebtn",
    iconClass: "success",
    textArea: "Event Cybersecurity Incident Response Report가 등록되었습니다.",
    btnText: "확인",

    rightBtn: () => { goList(); },
  })
};

const openCancelConfirm = () => {
  store.setModalInfo({
    on: true,
    type: "twobtn",
    iconClass: "success",
    textArea: "아직 등록되지 않은 내용이 있습니다. 페이지를 나가면 작성하신 내용이 모두 사라집니다.",

    rightBtn: () => { goList(); },
  })
};

// 파일업로드 관련 코드

// 최초 첨부파일 데이터 상태값
const cyberInitEvidenceData = ref({
  fileType: "CYBER_REPORT",
  fileCategory: "INIT_EVIDENCE",
  file: null,
})

// 최초 대응 절차, 일정 보고서 데이터 상태값
const cyberInitProcedureData = ref({
  fileType: "CYBER_REPORT",
  fileCategory: "INIT_PROCEDURE",
  file: null,
})

// 최초 대응 계획 보고서 데이터 상태값
const cyberInitPlanData = ref({
  fileType: "CYBER_REPORT",
  fileCategory: "INIT_PLAN",
  file: null,
})

// 갱신 첨부파일 데이터 상태값
const cyberRenewalEvidenceData = ref({
  fileType: "CYBER_REPORT",
  fileCategory: "RENEWAL_EVIDENCE",
  file: null,
})

// 갱신 대응 계획 보고서 데이터 상태값
const cyberRenewalPlanData = ref({
  fileType: "CYBER_REPORT",
  fileCategory: "RENEWAL_PLAN",
  file: null,
})

// 종료 첨부파일 데이터 상태값
const cyberFinalEvidenceData = ref({
  fileType: "CYBER_REPORT",
  fileCategory: "FINAL_EVIDENCE",
  file: null,
})

// 종료 사고 대응 보고서 데이터 상태값
const cyberFinalReportData = ref({
  fileType: "CYBER_REPORT",
  fileCategory: "FINAL_REPORT",
  file: null,
})

// 파일 선택 이벤트 처리
const onFileChange = async (e, data) => {
  const selectFile = e.target.files[0];

  if (!selectFile) return;

  data.file = selectFile;
  await postfetch_cyber_report_file(data);

  e.target.value = "";
}

// 파일 업로드 API 호출
const postfetch_cyber_report_file = async (fileData) => {
  const formData = new FormData();
  formData.append("fileType",fileData.fileType);
  formData.append("fileCategory",fileData.fileCategory);
  formData.append("file",fileData.file);
  
  try {
    const res = await axios.post('/api/vsoc/file',formData,{
      headers: {
        "Content-Type" : "multipart/form-data"
      }
    });
    
    const fileId = res.data.data.fileId;
    postData.value.data.fileAction.fileIdList.push(fileId);
  } catch (error) {
    console.error(error);
    alert('파일 업로드 실패');
  }
}
//
</script>